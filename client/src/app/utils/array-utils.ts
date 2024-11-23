import { Saving } from '../store/savings/savings.model';
import { Transaction } from '../store/transactions/transactions.model';

export const removeDuplicatesAndSortByDate = <T extends Transaction | Saving>(
  existingItems: T[],
  newItems: T[]
): T[] => {
  const map = new Map<string, T>();

  existingItems.forEach((item) => {
    map.set(item._id!, item);
  });

  newItems.forEach((item) => {
    map.set(item._id!, item);
  });

  const uniqueItems = Array.from(map.values());
  const result: T[] = [];

  uniqueItems.forEach((item) => {
    const index = binarySearchByDate(result, new Date(item.date));

    result.splice(index, 0, item);
  });

  return result;
};

const binarySearchByDate = <T extends Transaction | Saving>(
  arr: T[],
  date: Date
) => {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const midDate = new Date(arr[mid].date).getTime();

    if (midDate === date.getTime()) {
      return mid;
    } else if (midDate > date.getTime()) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return left;
};
