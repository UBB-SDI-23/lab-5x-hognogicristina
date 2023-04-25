import csv
import random
from enum import Enum
from faker import Faker
from multiprocessing import Process

fake = Faker()

OWNERS_COUNT = 1_000_000
CATS_COUNT = 2_000_000
FOODS_COUNT = 500_000
FOODS_FOR_CATS_COUNT = 5_000_000

MIN_ROLE_LEVEL = 1
MAX_ROLE_LEVEL = 100

class Gender(Enum):
    Female = 0
    Male = 1
    Other = 2

class CatColor(Enum):
    Black = 0
    White = 1
    Brown = 2
    Grey = 3
    Orange = 4

class FoodType(Enum):
    Dry = 0
    Wet = 1

def create_owners_csv():
    print("Begin create_owners_csv")

    with open("owners.csv", "w", newline="") as f:
        writer = csv.writer(f)

        for i in range(1, OWNERS_COUNT + 1):
            first_name = fake.first_name()
            last_name = fake.last_name()
            address = fake.address()
            phone = fake.random_int(min=10000000, max=99999999)
            email = fake.email()
            age = random.randint(18, 100)

            writer.writerow([i, first_name, last_name, address, phone, email, age])

    print("End create_owners_csv")

def create_cats_csv():
    print("Begin create_cats_csv")
    colors = list(CatColor)

    with open("cats.csv", "w", newline="") as f:
        writer = csv.writer(f)

        for i in range(1, CATS_COUNT + 1):
            name = fake.first_name()
            age = random.randint(1, 20)
            color = random.choice(colors).name
            breed = fake.word()
            weight = random.randint(1, 20)
            description = fake.sentence()
            ownerId = random.randint(1, OWNERS_COUNT)

            writer.writerow([i, name, age, color, breed, weight, description, ownerId])

    print("End create_cats_csv")

def create_foods_csv():
    print("Begin create_foods_csv")
    types = list(FoodType)

    with open("foods.csv", "w", newline="") as f:
        writer = csv.writer(f)

        for i in range(1, FOODS_COUNT + 1):
            name = fake.word()
            brand = fake.word()
            price = random.randint(1, 100)
            quantity = random.randint(1, 100)
            food_type = random.choice(types).name

            writer.writerow([i, name, brand, price, quantity, food_type])

    print("End create_foods_csv")

def create_foods_for_cats_csv():
    print("Begin create_foods_for_cats_csv")

    with open("foods_for_cats.csv", "w", newline="") as f:
        writer = csv.writer(f)

        for i in range(1, FOODS_FOR_CATS_COUNT + 1):
            catId = random.randint(1, CATS_COUNT)
            foodId = random.randint(1, FOODS_COUNT)
            purchased = fake.date_between(start_date='-1y', end_date='today')
            place = fake.address()

            writer.writerow([i, catId, foodId, purchased, place])

    print("End create_foods_for_cats_csv")

if __name__ == "__main__":
    processes = []
    for func in [
        create_owners_csv,
        create_cats_csv,
        create_foods_csv,
        create_foods_for_cats_csv,
    ]:
        p = Process(target=func)
        p.start()
        processes.append(p)

    for p in processes:
        p.join()

    print("End")