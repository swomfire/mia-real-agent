import { TICKET_STATUS } from '../../../common/enums';

export const ticketAdminAggregration = (conditions, limit, skip, sort) => [
  {
    $match: {
      ...conditions,
    },
  }, {
    $lookup: {
      from: 'user',
      localField: 'owner',
      foreignField: '_id',
      as: 'owner_doc',
    },
  }, {
    $addFields: {
      assignee: {
        $convert: {
          input: '$assignee',
          to: 7,
          onError: null,
        },
      },
    },
  }, {
    $lookup: {
      from: 'user',
      localField: 'assignee',
      foreignField: '_id',
      as: 'assignee_doc',
    },
  }, {
    $unwind: {
      path: '$assignee_doc',
      preserveNullAndEmptyArrays: true,
    },
  }, {
    $unwind: {
      path: '$owner_doc',
    },
  }, {
    $addFields: {
      weight: {
        $cond: [
          {
            $eq: [
              '$status', TICKET_STATUS.PROCESSING,
            ],
          }, 1, 0,
        ],
      },
    },
  }, {
    $sort: {
      weight: -1,
      ...sort,
    },
  }, {
    $project: {
      conversationId: 1,
      status: 1,
      owner: {
        profile: '$owner_doc.profile',
        role: '$owner_doc.role',
        username: '$owner_doc.username',
      },
      assignee: {
        profile: '$assignee_doc.profile',
        username: '$assignee_doc.username',
        rating: '$assignee_doc.rating',
      },
      category: 1,
      title: 1,
      description: 1,
      history: 1,
    },
  },
  {
    $skip: skip,
  }, {
    $limit: limit,
  },
];
