class AgentQueue {
  queue = []

  get = () => this.queue;

  getAgent = agentId => this.queue.find(({ _id }) => agentId.toString() === _id.toString());

  add = (agent) => {
    this.queue = this.queue.concat(agent);
  };

  remove = (agent) => {
    const { queue } = this;
    const { _id } = agent;
    this.queue = queue.filter(({ _id: removeAgentId }) => _id !== removeAgentId);
  };

  removeBySocket = (socketId) => {
    const { queue } = this;
    this.queue = queue.filter(({ socketId: removeSocketId }) => removeSocketId !== socketId);
  }
}

// eslint-disable-next-line import/no-mutable-exports
let agentQueue = null;

if (!agentQueue) {
  agentQueue = new AgentQueue();
}

export default agentQueue;
