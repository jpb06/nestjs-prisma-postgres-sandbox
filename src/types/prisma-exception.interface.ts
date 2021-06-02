export interface PrismaException<TMeta> {
  message: string;
  code?: string;
  meta?: TMeta;
}
