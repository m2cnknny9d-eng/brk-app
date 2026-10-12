-- Gruppen einfügen
INSERT INTO "Group" (id, name, description, color, icon, "isPublic", "requiresAdmin") VALUES
('group_1', 'Bereitschaft Nördlingen', 'Öffentliche Bereitschaft', '#DC2626', 'Shield', true, false),
('group_2', 'SEG Behandlung Nördlingen', 'Spezialeinheit - Nur Admin', '#991B1B', 'AlertCircle', false, true);

-- Trainings/Lehrgänge einfügen
INSERT INTO "Training" (id, name, description, "validityMonths", "requiredFrequency", icon, color) VALUES
('training_1', 'Reanimation', 'Wiederbelebungskurs - Lebensrettende Sofortmaßnahmen', 24, 'biennial', '❤️', '#EF4444'),
('training_2', 'Unterweisung Blaulichtfahrt', 'Sichere Fahrzeugführung im Einsatz', 12, 'yearly', '🚗', '#3B82F6'),
('training_3', 'Funken', 'Funkgerätebedienung und Kommunikation', 36, 'yearly', '📡', '#8B5CF6'),
('training_4', 'Grundlagen Sanitätswachdienst', 'Grundlagen des Sanitätswachdienstes', 24, 'biennial', '🏥', '#10B981');

-- Trainings der Bereitschaft Nördlingen zuordnen
INSERT INTO "GroupTraining" (id, "groupId", "trainingId", "isRequired") VALUES
('gt_1', 'group_1', 'training_1', true),
('gt_2', 'group_1', 'training_2', true),
('gt_3', 'group_1', 'training_3', true),
('gt_4', 'group_1', 'training_4', true),
('gt_5', 'group_2', 'training_1', true),
('gt_6', 'group_2', 'training_4', true);

-- Test-User einfügen (Passwörter sind mit bcrypt gehashed)
-- volunteer@brk.de / password123
INSERT INTO "User" (id, email, name, password, role, "isAdmin") VALUES
('user_1', 'volunteer@brk.de', 'Max Mustermann', '$2b$10$WQwh0VSZm6CXEGqZLhI8eOrDH1l6XYbhCmqfDjw4mHjz8M5mPPzEO', 'VOLUNTEER', false);

-- admin@brk.de / admin123
INSERT INTO "User" (id, email, name, password, role, "isAdmin") VALUES
('user_2', 'admin@brk.de', 'Anna Admin', '$2b$10$dXJ3MN8K9LpWfH2s4vQ8seB8KmZfJ5tN7qP9rL2mN4oW5xZ6yT7pW', 'ADMIN', true);

-- Benutzer zur Bereitschaft hinzufügen
INSERT INTO "UserGroup" (id, "userId", "groupId", "joinedAt") VALUES
('ug_1', 'user_1', 'group_1', NOW()),
('ug_2', 'user_2', 'group_1', NOW()),
('ug_3', 'user_2', 'group_2', NOW());

-- Test-Kurstermine einfügen
INSERT INTO "CourseInstance" (id, "trainingId", title, description, "startDate", "endDate", location, instructor, "maxParticipants") VALUES
('course_1', 'training_1', 'Reanimationskurs November', 'Grundkurs in der Kreisgeschäftsstelle', '2024-11-15 09:00:00', '2024-11-15 16:00:00', 'Nördlingen, Kreisgeschäftsstelle', 'Dr. Schmidt', 15),
('course_2', 'training_1', 'Reanimationskurs Dezember', 'Fortgeschrittenenkurs', '2024-12-10 09:00:00', '2024-12-10 16:00:00', 'Nördlingen, Kreisgeschäftsstelle', 'Dr. Schmidt', 12),
('course_3', 'training_2', 'Blaulichtfahrt September', 'Sichere Fahrzeugführung', '2024-09-20 10:00:00', '2024-09-20 17:00:00', 'Fahrlehrgelände', 'Fahrer Max', 20),
('course_4', 'training_3', 'Funk-Grundkurs Oktober', 'Basis-Funkgerätebedienung', '2024-10-05 14:00:00', '2024-10-05 18:00:00', 'Funkraum', 'Herbert Funk', 10),
('course_5', 'training_4', 'Sanitätswachdienst-Kurs', 'Ausbildung Sanitätswachdienst', '2024-11-22 09:00:00', '2024-11-22 17:00:00', 'Nördlingen, Kreisgeschäftsstelle', 'Sanität Team', 25);
