export function getDefaultMeasures(userId: string) {
  return [
    {
      label: "Извлечь объем",
      params: [
        {
          variants: "[мm]л|[мm]l",
          coefficient: 1,
        },
        {
          variants: "л|l",
          coefficient: 1000,
        },
      ],
      userId,
    },
    {
      label: "Извлечь длину",
      params: [
        {
          variants: "[мm][мm]",
          coefficient: 1,
        },
        {
          variants: "с[мm]|s[мm]",
          coefficient: 10,
        },
        {
          variants: "м|m",
          coefficient: 1000,
        },
      ],
      userId,
    },
    {
      label: "Извлечь массу",
      params: [
        {
          variants: "[мm][кk]г|[мm]cg|μg",
          coefficient: 1,
        },
        {
          variants: "[мm]г|[мm]g",
          coefficient: 1000,
        },
        {
          variants: "г|гр|g|gr",
          coefficient: 1000000,
        },
        {
          variants: "[кk]г|[кk]g",
          coefficient: 1000000000,
        },
      ],
      userId,
    },
  ]
}

export function getDefaultWords(userId: string) {
  return [
    {
      label: "Извлечь цвета",
      params: [
        {
          variants: "бежевый|beige",
        },
        {
          variants: "белый|white",
        },
        {
          variants: "ж[её]лтый|yellow",
        },
        {
          variants: "зел[её]ный|green",
        },
        {
          variants: "коричневый|brown",
        },
        {
          variants: "красный|red",
        },
        {
          variants: "оранжевый|orange",
        },
        {
          variants: "розовый|pink",
        },
        {
          variants: "серый|gr[ae]y",
        },
        {
          variants: "синий|blue",
        },
        {
          variants: "ч[её]рный|black",
        },
      ],
      userId,
    },
  ]
}

export function getDefaultQuantities(userId: string) {
  return [
    {
      label: "Извлечь количество",
      params: {
        variantsAfterNumber: "шт|бр|tabs|caps|капс|табл|доза?|пара?",
        variantsBeforeNumber: "x|х|№",
      },
      userId,
    },
  ]
}
