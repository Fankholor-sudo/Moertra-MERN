import React from 'react'
import { View } from 'react-native'
import { CATEGORIES } from '../../data/sampleData'
import { Category } from '../../types'
import { CategoryCard, categoryGridStyles } from '../common/CategoryCard'

type Props = {
  onSelect: (category: Category) => void
}

export function CategoryPicker({ onSelect }: Props) {
  return (
    <View style={categoryGridStyles.rows}>
      {CATEGORIES.map((item) => (
        <CategoryCard key={item} category={item} variant="row" onPress={() => onSelect(item)} />
      ))}
    </View>
  )
}
