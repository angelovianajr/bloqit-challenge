INSERT INTO bloq (id, title, address)
VALUES 
('c3ee858c-f3d8-45a3-803d-e080649bbb6f', 'Luitton Vouis Champs Elysées', '101 Av. des Champs-Élysées, 75008 Paris, France'),
('484e01be-1570-4ac1-a2a9-02aad3acc54e', 'Riod Eixample', 'Pg. de Gràcia, 74, L''Eixample, 08008 Barcelona, Spain'),
('22ffa3c5-3a3d-4f71-81f1-cac18ffbc510', 'Bluberry Regent Street', '121 Regent St, Mayfair, London W1B 4TB, United Kingdom');

INSERT INTO `locker` (`id`,`bloqId`,`status`,`isOccupied`)
VALUES
('1b8d1e89-2514-4d91-b813-044bf0ce8d20','c3ee858c-f3d8-45a3-803d-e080649bbb6f','CLOSED',TRUE),
('8b4b59ae-8de5-4322-a426-79c29315a9f1','c3ee858c-f3d8-45a3-803d-e080649bbb6f','OPEN',FALSE),
('2191e1b5-99c7-45df-8302-998be394be48','c3ee858c-f3d8-45a3-803d-e080649bbb6f','CLOSED',TRUE),
('6b33b2d1-af38-4b60-a3c5-53a69f70a351','484e01be-1570-4ac1-a2a9-02aad3acc54e','CLOSED',TRUE),
('ea6db2f6-2da7-42ed-9619-d40d718b7bec','484e01be-1570-4ac1-a2a9-02aad3acc54e','CLOSED',FALSE),
('3c881050-54bb-48bb-9d2c-f221d10f876b','484e01be-1570-4ac1-a2a9-02aad3acc54e','OPEN',FALSE),
('3139e8ce-ff98-4cb4-9e00-7f9d8b20e732','22ffa3c5-3a3d-4f71-81f1-cac18ffbc510','OPEN',FALSE),
('75f03ea9-c825-4e76-9484-f8b7f0a1d125','22ffa3c5-3a3d-4f71-81f1-cac18ffbc510','OPEN',FALSE),
('c4705b02-45be-4fd7-8d82-d336df1fa493','22ffa3c5-3a3d-4f71-81f1-cac18ffbc510','CLOSED',FALSE);

INSERT INTO "rent" ("id","lockerId","weight","size")
VALUES
('50be06a8-1dec-4b18-a23c-e98588207752',NULL,5,'M'),
('40efc6fd-f10c-4561-88bf-be916613377c','1b8d1e89-2514-4d91-b813-044bf0ce8d20',7,'L'),
('84ba232e-ce23-4d8f-ae26-68616600df48','6b33b2d1-af38-4b60-a3c5-53a69f70a351',10,'XL'),
('feb72a9a-258d-49c9-92de-f90b1f11984d','6b33b2d1-af38-4b60-a3c5-53a69f70a351',30,'XL');