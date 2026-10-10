import React from 'react'
import { View } from 'react-native'
import { CATEGORIES } from '../../data/sampleData'
import { Category } from '../../types'
import { CategoryCard, categoryGridStyle } from '../common/CategoryCard'

type Props = {
  onSelect: (category: Category) => void
}

export function CategoryPicker({ onSelect }: Props) {
  return (
    <View style={categoryGridStyle}>
      {CATEGORIES.map((item) => (
        <CategoryCard key={item} category={item} onPress={() => onSelect(item)} showChevron />
      ))}
    </View>
  )
}
