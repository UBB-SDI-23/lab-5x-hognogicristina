USE [your_database_name]
GO

-- Drop constraints
ALTER TABLE cats DROP CONSTRAINT FK_cats_owners_owner_id;
ALTER TABLE foods_for_cats DROP CONSTRAINT FK_foods_for_cats_cats_cat_id;
ALTER TABLE foods_for_cats DROP CONSTRAINT FK_foods_for_cats_foods_food_id;
GO

TRUNCATE TABLE owners
TRUNCATE TABLE cats
TRUNCATE TABLE foods
TRUNCATE TABLE foods_for_cats
GO

-- BULK INSERT data from CSV files
BULK INSERT owners
FROM 'D:\Fukulta\Collage\Courses\Second Year\Semester 4\Systems for Design and Implementation\Laboratories\Laboratory 5\lab-5x-hognogicristina\records\owners.csv'
WITH (FORMAT = 'CSV', FIRSTROW = 1, FIELDTERMINATOR = ',', ROWTERMINATOR = '\n');
GO

BULK INSERT cats
FROM 'D:\Fukulta\Collage\Courses\Second Year\Semester 4\Systems for Design and Implementation\Laboratories\Laboratory 5\lab-5x-hognogicristina\records\cats.csv'
WITH (FORMAT = 'CSV', FIRSTROW = 1, FIELDTERMINATOR = ',', ROWTERMINATOR = '\n');
GO

BULK INSERT foods
FROM 'D:\Fukulta\Collage\Courses\Second Year\Semester 4\Systems for Design and Implementation\Laboratories\Laboratory 5\lab-5x-hognogicristina\records\foods.csv'
WITH (FORMAT = 'CSV', FIRSTROW = 1, FIELDTERMINATOR = ',', ROWTERMINATOR = '\n');
GO

BULK INSERT foods_for_cats
FROM 'D:\Fukulta\Collage\Courses\Second Year\Semester 4\Systems for Design and Implementation\Laboratories\Laboratory 5\lab-5x-hognogicristina\records\foods_for_cats.csv'
WITH (FORMAT = 'CSV', FIRSTROW = 1, FIELDTERMINATOR = ',', ROWTERMINATOR = '\n');
GO

-- Recreate constraints
ALTER TABLE cats
ADD CONSTRAINT FK_cats_owners_owner_id FOREIGN KEY (owner_id) REFERENCES owners (id);

ALTER TABLE foods_for_cats
ADD CONSTRAINT FK_foods_for_cats_cats_cat_id FOREIGN KEY (cat_id) REFERENCES cats (id),
CONSTRAINT FK_foods_for_cats_foods_food_id FOREIGN KEY (food_id) REFERENCES foods (id);
GO

SELECT COUNT() AS 'Owners' FROM owners
SELECT COUNT() AS 'Cats' FROM cats
SELECT COUNT() AS 'Foods' FROM foods
SELECT COUNT() AS 'Foods for Cats' FROM foods_for_cats