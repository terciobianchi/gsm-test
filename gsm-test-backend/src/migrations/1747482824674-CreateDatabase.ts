import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDatabase1747482824674 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {        
        await queryRunner.query(
            `CREATE SEQUENCE seq_users
                INCREMENT BY 1
                MINVALUE 1
                MAXVALUE 9223372036854775807
                START 1
                CACHE 1
                NO CYCLE;`,
        );        
        await queryRunner.query(
            `CREATE TABLE users (
                id int8 DEFAULT nextval('seq_users'::regclass) NOT NULL,
                "name" varchar(100) NOT NULL,
                username varchar(100) NOT NULL,
                "password" varchar(255) NOT NULL,
                CONSTRAINT users_pkey PRIMARY KEY (id)
            );`,
        );   
        
        await queryRunner.query(
            `INSERT INTO users
                (id, "name", username, "password")
                VALUES(0, 'USUARIO DE TESTES', 'user.teste@gmail.com', '$2b$10$AnAu8erApYDSZFsSLj6oEuBoyG1Bg3IjLcoxWni277D2QD1szvrKa');`,
        );     

        await queryRunner.query(
            `CREATE SEQUENCE seq_tasks
                INCREMENT BY 1
                MINVALUE 1
                MAXVALUE 9223372036854775807
                START 1
                CACHE 1
                NO CYCLE;`,
        );   

        await queryRunner.query(
            `CREATE TABLE tasks (
                id int8 DEFAULT nextval('seq_tasks'::regclass) NOT NULL,
                title varchar(100) NOT NULL,
                description text NULL,
                status varchar(1) NOT NULL,
                created_at date DEFAULT now() NOT NULL,
                user_id int8 DEFAULT 0 NOT NULL,
                CONSTRAINT tasks_pkey PRIMARY KEY (id)
            );`,
        );                          
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DROP TABLE tasks;`,
        );   
        await queryRunner.query(
            `DROP TABLE users;`,
        );   
        await queryRunner.query(
            `DROP SEQUENCE seq_users;`,
        );   
        await queryRunner.query(
            `DROP DROP SEQUENCE seq_tasks;`,
        );                               
    }

}
