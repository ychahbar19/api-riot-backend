type Tokens = {
  accessToken: string;
  refreshToken: string;
};

type JwtPayload = {
  sub: string;
  email: string;
};

type JwtPayloadWithRt = JwtPayload & {
  refreshToken: string;
};

export { Tokens, JwtPayload, JwtPayloadWithRt };
