

const sumReduce = (numberList) => {
    return numberList.reduce((sum, number) => sum + number, 0) 
}
console.log(sumReduce([1, 2, 3, 4, 5]))

const findTheLongestWord = (wordList) => {
    if (!Array.isArray(wordList) || wordList.length == 0) {return null
    } else {
        return wordList.reduce((longestWord, currentWord) => {
            return longestWord.length > currentWord.length
                ? longestWord
                : currentWord
        }, wordList[0])
    }
}
let wordList = ['hello', 'pet', 'Longestword']
console.log(findTheLongestWord(wordList))

const itemList = [
    {
        id: 'key1', 
        value: 'Superman'
    },
    {
        id: 'key2', 
        value: 'Batman'
    },
    {
        id: 'key3', 
        value: 'Spiderman'
    }
]

const arrayToObject = (itemList) => {
    return itemList.reduce((itemMap, item) => {
        itemMap[item.id] = item.value
        return itemMap  
    }, {})
}
console.log(arrayToObject(itemList))

const itemList = [
    ['key1', 'name1', 'id1', '10']
    ['key2', 'name1', 'id1', '12']
    ['key1', 'name2', 'id1', '1']
    ['key1', 'name3', 'id1', '6']
    ['key2', 'name2', 'id1', '5']
]
const arrayToArray = (itemList) => {
    return itemList.reduce((itemMap, item) => {
        itemMap[1] = item[1]
        return itemMap  
    }, {})
}
console.log(arrayToArray(itemList))

const items = [{
    name: 'dell-66',
    price: 200,
    id: 12,
  }, {
    name: 'hp-44',
    price: 100,
    id: 10,
  }, {
    name: 'acer-33',
    price: 250,
    id: 33,
  }, {
    name: 'dell-66',
    price: 200,
    id: 12,
  }, {
    name: 'acer-33',
    price: 250,
    id: 33,
  }, {
    name: 'dell-66',
    price: 200,
    id: 12,
  },
].reduce((res, obj) => {
  res[obj.name] = { 
    item_price: (obj.name in res ? res[obj.name].item_price : 0) + obj.price
  }
  return res;
}, {})

console.log(items);

const arr = [
    {name: "qewregf dqewafs", value: "qewregf dqewafs answer", count: 2},
    {name: "survey with select", value: "survey with select answer", count: 2},
    {name: "werasd", value: "Donald", count: 1},
    {name: "werasd", value: "Jim", count: 1}
  ];
  
  const result = arr.reduce((acc, d) => {
    const found = acc.find(a => a.name === d.name);
    //const value = { name: d.name, val: d.value };
    const value = { value: d.value, count: d.count }; // the element in data property
    if (!found) {
      //acc.push(...value);
      acc.push({name: d.name, data: [value]}) // not found, so need to add data property
    }
    else {
      //acc.push({ name: d.name, data: [{ value: d.value }, { count: d.count }] });
      found.data.push(value) // if found, that means data property exists, so just push new element to found.data.
    }
    return acc;
  }, []);
  
  console.log(result)