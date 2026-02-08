/*
  Warnings:

  - You are about to alter the column `status` on the `tarefas` table. The data in that column could be lost. The data in that column will be cast from `String` to `Boolean`.
  - Added the required column `atualizado_em` to the `tarefas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prazo` to the `tarefas` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tarefas" (
    "id_tarefa" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "frequencia" TEXT NOT NULL,
    "prazo" DATETIME NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "id_responsavel" INTEGER,
    "id_republica" INTEGER NOT NULL,
    "criado_em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" DATETIME NOT NULL,
    CONSTRAINT "tarefas_id_responsavel_fkey" FOREIGN KEY ("id_responsavel") REFERENCES "usuarios" ("id_usuario") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "tarefas_id_republica_fkey" FOREIGN KEY ("id_republica") REFERENCES "republicas" ("id_republica") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_tarefas" ("descricao", "frequencia", "id_republica", "id_responsavel", "id_tarefa", "status", "titulo") SELECT "descricao", "frequencia", "id_republica", "id_responsavel", "id_tarefa", "status", "titulo" FROM "tarefas";
DROP TABLE "tarefas";
ALTER TABLE "new_tarefas" RENAME TO "tarefas";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
