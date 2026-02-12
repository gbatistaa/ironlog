import {
  BadRequestException,
  ConflictException,
  NotFoundException,
  HttpException,
} from '@nestjs/common';
import { EntityNotFoundError, QueryFailedError } from 'typeorm';

interface IDatabaseError extends Error {
  code?: string;
  detail?: string;
  constraint?: string;
}

export function handleDatabaseErrors(error: unknown): void {
  if (error instanceof HttpException) {
    throw error;
  }

  if (error instanceof EntityNotFoundError) {
    throw new NotFoundException('Registro não encontrado no banco de dados.');
  }

  if (error instanceof QueryFailedError || (error as IDatabaseError).code) {
    const dbError = error as IDatabaseError;

    switch (dbError.code) {
      case '23505':
        throw new ConflictException(
          `Conflito de dados: Registro duplicado encontrado. Detalhe: ${dbError.detail || 'Campo único violado.'}`,
        );

      case '23503':
        throw new BadRequestException(
          `Erro de relacionamento: O registro referenciado não existe ou não pode ser excluído. Constraint: ${dbError.constraint}`,
        );

      case '23502':
        throw new BadRequestException(
          'Dados incompletos: Um campo obrigatório do banco de dados está nulo.',
        );

      case '22P02':
        throw new BadRequestException(
          'Formato de dados inválido para o banco de dados (Ex: UUID ou Número incorreto).',
        );
    }
  }

  throw error;
}
