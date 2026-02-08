-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_usuarios_republicas" (
    "id_usuario" INTEGER NOT NULL,
    "id_republica" INTEGER NOT NULL,
    "papel" TEXT NOT NULL DEFAULT 'MEMBRO',
    "data_entrada" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id_usuario", "id_republica"),
    CONSTRAINT "usuarios_republicas_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios" ("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "usuarios_republicas_id_republica_fkey" FOREIGN KEY ("id_republica") REFERENCES "republicas" ("id_republica") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_usuarios_republicas" ("id_republica", "id_usuario", "papel") SELECT "id_republica", "id_usuario", "papel" FROM "usuarios_republicas";
DROP TABLE "usuarios_republicas";
ALTER TABLE "new_usuarios_republicas" RENAME TO "usuarios_republicas";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
