import { faker } from "@faker-js/faker";

faker.seed(2);

const dataLength = 50;
const hasStories = faker.helpers.arrayElements(
  [...Array(dataLength).keys()],
  12,
);

export const telegramData = Array.from({ length: dataLength }).map(
  (_, index) => ({
    key: faker.string.uuid(),
    name: faker.person.fullName(),
    avatar: faker.image.avatarGitHub(),
    date: faker.date.past({
      years: 1,
    }),
    message: faker.lorem.sentence({ min: 7, max: 15 }),
    hasStories: hasStories.includes(index),
    bg: faker.color.rgb(),
  }),
);

// export const myStoryData = {
//   key: faker.string.uuid(),
//   name: faker.person.fullName(),
//   avatar: faker.image.avatarGitHub(),
//   date: faker.date.past({
//     years: 1,
//   }),
//   message: faker.lorem.sentence({ min: 7, max: 15 }),
//   bg: faker.color.rgb(),
//   hasStories: false,
// };

export const headerHeight = 64;
export const storiesHeight = 100;
export const storyAvatarSize = 70;
export const headerAvatarSize = 30;
export const maxHeaderItems = 3;
