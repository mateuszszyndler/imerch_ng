interface FilterValue {
  name: string;
  checked: boolean;
}

export interface Filter {
  search?: string;
  categories?: FilterValue[];
  types?: FilterValue[];
  sizes?: FilterValue[];
  colors?: FilterValue[];
  price?: { min: number; max: number };
}
