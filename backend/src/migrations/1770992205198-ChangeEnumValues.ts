import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeEnumValues1770992205198 implements MigrationInterface {
  name = 'ChangeEnumValues1770992205198';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. Renomeia o tipo antigo para não dar conflito
    await queryRunner.query(
      `ALTER TYPE "public"."exercise_musclegroup_enum" RENAME TO "exercise_musclegroup_enum_old"`,
    );

    // 2. Cria o novo tipo com os nomes das strings
    await queryRunner.query(
      `CREATE TYPE "public"."exercise_musclegroup_enum" AS ENUM('chest', 'back', 'legs', 'shoulders', 'arms', 'core', 'calves', 'cardio', 'other')`,
    );

    // 3. Altera a coluna usando CASE para converter os IDs numéricos para as strings correspondentes
    await queryRunner.query(`
      ALTER TABLE "exercise" 
      ALTER COLUMN "muscleGroup" TYPE "public"."exercise_musclegroup_enum" 
      USING (
        CASE "muscleGroup"::text
          WHEN '0' THEN 'chest'::"public"."exercise_musclegroup_enum"
          WHEN '1' THEN 'back'::"public"."exercise_musclegroup_enum"
          WHEN '2' THEN 'legs'::"public"."exercise_musclegroup_enum"
          WHEN '3' THEN 'shoulders'::"public"."exercise_musclegroup_enum"
          WHEN '4' THEN 'arms'::"public"."exercise_musclegroup_enum"
          WHEN '5' THEN 'core'::"public"."exercise_musclegroup_enum"
          WHEN '6' THEN 'calves'::"public"."exercise_musclegroup_enum"
          WHEN '7' THEN 'cardio'::"public"."exercise_musclegroup_enum"
          WHEN '8' THEN 'other'::"public"."exercise_musclegroup_enum"
          ELSE 'other'::"public"."exercise_musclegroup_enum"
        END
      )
    `);

    // 4. Agora sim, podemos apagar o tipo antigo
    await queryRunner.query(
      `DROP TYPE "public"."exercise_musclegroup_enum_old"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Caminho reverso: volta para os números '0', '1', etc.
    await queryRunner.query(
      `CREATE TYPE "public"."exercise_musclegroup_enum_old" AS ENUM('0', '1', '2', '3', '4', '5', '6', '7', '8')`,
    );

    await queryRunner.query(`
      ALTER TABLE "exercise" 
      ALTER COLUMN "muscleGroup" TYPE "public"."exercise_musclegroup_enum_old" 
      USING (
        CASE "muscleGroup"::text
          WHEN 'chest' THEN '0'::"public"."exercise_musclegroup_enum_old"
          WHEN 'back' THEN '1'::"public"."exercise_musclegroup_enum_old"
          WHEN 'legs' THEN '2'::"public"."exercise_musclegroup_enum_old"
          WHEN 'shoulders' THEN '3'::"public"."exercise_musclegroup_enum_old"
          WHEN 'arms' THEN '4'::"public"."exercise_musclegroup_enum_old"
          WHEN 'core' THEN '5'::"public"."exercise_musclegroup_enum_old"
          WHEN 'calves' THEN '6'::"public"."exercise_musclegroup_enum_old"
          WHEN 'cardio' THEN '7'::"public"."exercise_musclegroup_enum_old"
          WHEN 'other' THEN '8'::"public"."exercise_musclegroup_enum_old"
          ELSE '8'::"public"."exercise_musclegroup_enum_old"
        END
      )
    `);

    await queryRunner.query(`DROP TYPE "public"."exercise_musclegroup_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."exercise_musclegroup_enum_old" RENAME TO "exercise_musclegroup_enum"`,
    );
  }
}
