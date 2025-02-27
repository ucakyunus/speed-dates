import { faker } from "@faker-js/faker";

faker.seed(1);

const dataLength = 50;
const matchedProfiles = faker.helpers.arrayElements(
  Array.from(Array(dataLength).keys()),
  10,
);

export const images = [
  "https://cdn.dribbble.com/users/3281732/screenshots/11192830/media/7690704fa8f0566d572a085637dd1eee.jpg?compress=1&resize=1200x1200",
  "https://cdn.dribbble.com/users/3281732/screenshots/13130602/media/592ccac0a949b39f058a297fd1faa38e.jpg?compress=1&resize=1200x1200",
  "https://cdn.dribbble.com/users/3281732/screenshots/9165292/media/ccbfbce040e1941972dbc6a378c35e98.jpg?compress=1&resize=1200x1200",
  "https://cdn.dribbble.com/users/3281732/screenshots/11205211/media/44c854b0a6e381340fbefe276e03e8e4.jpg?compress=1&resize=1200x1200",
  "https://cdn.dribbble.com/users/3281732/screenshots/7003560/media/48d5ac3503d204751a2890ba82cc42ad.jpg?compress=1&resize=1200x1200",
  "https://cdn.dribbble.com/users/3281732/screenshots/6727912/samji_illustrator.jpeg?compress=1&resize=1200x1200",
  "https://cdn.dribbble.com/users/3281732/screenshots/13661330/media/1d9d3cd01504fa3f5ae5016e5ec3a313.jpg?compress=1&resize=1200x1200",
];

export const tinderData = Array.from({ length: dataLength }).map((_, index) => {
  const id = faker.string.uuid();
  const imageCount = faker.number.int({ min: 2, max: 4 });
  const profileImages = faker.helpers.arrayElements(images, imageCount);

  return {
    id,
    key: id,
    name: faker.person.firstName(),
    age: faker.number.int({ min: 18, max: 35 }),
    bio: faker.lorem.sentences(2),
    distance: faker.number.int({ min: 1, max: 20 }),
    images: profileImages,
    matched: matchedProfiles.includes(index),
  };
});
