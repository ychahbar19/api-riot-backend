import { HttpException } from '@nestjs/common';

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

const getServerAndRegion = (dto: { platform: string }) => {
  const riotRoutingPlatforms: string[] = getAllServersFromRoutingPlatforms();
  const server: string = getServerFromRoutingPlatform(dto.platform);
  const region: string = getRegionFromRoutingPlatform(dto.platform);

  if (!riotRoutingPlatforms.includes(server))
    throw new HttpException('Invalid platform', 400);

  return { server, region };
};

export {
  getServerAndRegion,
  getAllRoutingPlatform,
  getAllServersFromRoutingPlatforms,
  getAllRegionsFromRoutingPlatforms,
};
