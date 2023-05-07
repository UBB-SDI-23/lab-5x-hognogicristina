LOAD DATA INFILE 'D:/Fukulta/Collage/Courses/Second Year/Semester 4/Systems for Design and Implementation/Laboratories/Laboratory 5/records/foods_for_cats_data.csv'
INTO TABLE foods_for_cats
FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\r\n' IGNORE 1 ROWS;

SELECT COUNT(*) AS 'Foods for Cats' FROM foods_for_cats;
