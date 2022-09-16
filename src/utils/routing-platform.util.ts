const getRegionFromRoutingPlatform = (routingPlatform: string): string => {
  const region = routingPlatform.split(':')[0];
  return region;
};

const getServerFromRoutingPlatform = (routingPlatform: string): string => {
  const server = routingPlatform.split(':')[1];
  return server;
};

const getAllServersFromRoutingPlatforms = (): string[] => {
  const routingPlatforms = process.env.RIOT_ROUTING_PLATFORMS.split(', ');
  const servers = routingPlatforms.map((routingPlatform) =>
    getServerFromRoutingPlatform(routingPlatform),
  );
  return servers;
};

const getAllRegionsFromRoutingPlatforms = (): string[] => {
  const routingPlatforms = process.env.RIOT_ROUTING_PLATFORMS.split(', ');
  const regions = routingPlatforms.map((routingPlatform) =>
    getRegionFromRoutingPlatform(routingPlatform),
  );
  return regions;
};

const getAllRoutingPlatform = (): string[] => {
  const routingPlatforms = process.env.RIOT_ROUTING_PLATFORMS.split(', ');
  return routingPlatforms;
};

export {
  getAllServersFromRoutingPlatforms,
  getAllRegionsFromRoutingPlatforms,
  getAllRoutingPlatform,
  getRegionFromRoutingPlatform,
  getServerFromRoutingPlatform,
};
