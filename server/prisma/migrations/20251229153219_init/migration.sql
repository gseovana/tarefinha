-- CreateTable
CREATE TABLE "usuarios" (
    "id_usuario" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "republicas" (
    "id_republica" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "codigo_acesso" TEXT NOT NULL,
    "id_lider" INTEGER NOT NULL,
    CONSTRAINT "republicas_id_lider_fkey" FOREIGN KEY ("id_lider") REFERENCES "usuarios" ("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "usuarios_republicas" (
    "id_usuario" INTEGER NOT NULL,
    "id_republica" INTEGER NOT NULL,

    PRIMARY KEY ("id_usuario", "id_republica"),
    CONSTRAINT "usuarios_republicas_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios" ("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "usuarios_republicas_id_republica_fkey" FOREIGN KEY ("id_republica") REFERENCES "republicas" ("id_republica") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "tarefas" (
    "id_tarefa" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "frequencia" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "id_responsavel" INTEGER NOT NULL,
    "id_republica" INTEGER NOT NULL,
    CONSTRAINT "tarefas_id_responsavel_fkey" FOREIGN KEY ("id_responsavel") REFERENCES "usuarios" ("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tarefas_id_republica_fkey" FOREIGN KEY ("id_republica") REFERENCES "republicas" ("id_republica") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "historico_tarefas" (
    "id_historico" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "data_conclusao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_tarefa" INTEGER NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    CONSTRAINT "historico_tarefas_id_tarefa_fkey" FOREIGN KEY ("id_tarefa") REFERENCES "tarefas" ("id_tarefa") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "historico_tarefas_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios" ("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");
