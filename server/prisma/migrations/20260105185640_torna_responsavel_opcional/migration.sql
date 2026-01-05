-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tarefas" (
    "id_tarefa" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "frequencia" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "id_responsavel" INTEGER,
    "id_republica" INTEGER NOT NULL,
    CONSTRAINT "tarefas_id_responsavel_fkey" FOREIGN KEY ("id_responsavel") REFERENCES "usuarios" ("id_usuario") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "tarefas_id_republica_fkey" FOREIGN KEY ("id_republica") REFERENCES "republicas" ("id_republica") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_tarefas" ("descricao", "frequencia", "id_republica", "id_responsavel", "id_tarefa", "status", "titulo") SELECT "descricao", "frequencia", "id_republica", "id_responsavel", "id_tarefa", "status", "titulo" FROM "tarefas";
DROP TABLE "tarefas";
ALTER TABLE "new_tarefas" RENAME TO "tarefas";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
