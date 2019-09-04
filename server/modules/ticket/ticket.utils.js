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

export const ticketWarningAdminAggregration = (conditions, limit, skip, sort) => [
  {
    $match: {
      ...conditions,
    },
  }, {
    $lookup: {
      from: 'reply',
      localField: 'conversationId',
      foreignField: 'conversationId',
      as: 'replies',
    },
  }, {
    $project: {
      conversationId: 1,
      status: 1,
      owner: 1,
      assignee: 1,
      category: 1,
      title: 1,
      description: 1,
      history: 1,
      replies: {
        $filter: {
          input: '$replies',
          as: 'replies',
          cond: {
            $eq: [
              '$$replies.type', 'WARNING_ACTION',
            ],
          },
        },
      },
    },
  }, {
    $unwind: {
      path: '$replies',
    },
  }, {
    $group: {
      _id: '$_id',
      owner: {
        $first: '$owner',
      },
      assignee: {
        $first: '$assignee',
      },
      status: {
        $first: '$status',
      },
      title: {
        $first: '$title',
      },
      category: {
        $first: '$category',
      },
      description: {
        $first: '$description',
      },
      history: {
        $first: '$history',
      },
      conversationId: {
        $first: '$conversationId',
      },
      replies: {
        $push: '$replies',
      },
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
        nickname: '$assignee_doc.nickname',
        username: '$assignee_doc.username',
        rating: '$assignee_doc.rating',
      },
      category: 1,
      title: 1,
      description: 1,
      history: 1,
    },
  }, {
    $skip: skip,
  }, {
    $limit: limit,
  },
];
