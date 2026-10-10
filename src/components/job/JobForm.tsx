import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useTheme } from '../../theme/ThemeContext'
import { Category, JobDetails } from '../../types'
import { FormField } from '../common/FormField'
import { PrimaryButton } from '../common/PrimaryButton'

type Props = {
  category: Category
  details: JobDetails
  onChange: (field: keyof JobDetails, value: string) => void
  onSubmit: () => void
}

function workPlaceholder(category: Category) {
  return category === 'Construction' ? 'e.g. Build a boundary wall' : `e.g. ${category} repair`
}

function specificsLabel(category: Category) {
  if (category === 'Construction') return 'Rooms, dimensions, materials'
  if (category === 'Plumbing') return 'Kitchen, bathroom, shower'
  return 'Add useful specifics'
}

export function JobForm({ category, details, onChange, onSubmit }: Props) {
  const { colors } = useTheme()

  return (
    <View style={styles.form}>
      <FormField
        label="What work is required?"
        value={details.work}
        onChangeText={(value) => onChange('work', value)}
        placeholder={workPlaceholder(category)}
      />
      <FormField
        label="Describe the task"
        value={details.description}
        onChangeText={(value) => onChange('description', value)}
        placeholder="Include the size of the area and access details"
        multiline
      />
      <FormField
        label={specificsLabel(category)}
        value={details.specifics}
        onChangeText={(value) => onChange('specifics', value)}
        placeholder="Add specifics"
      />
      <Text style={[styles.note, { color: colors.accent }]}>
        We invite 3 nearby artisans. Their bids show price, rating, distance, and reviews. Your
        request stays open for 7 days.
      </Text>
      <PrimaryButton label="Send request" onPress={onSubmit} />
    </View>
  )
}

const styles = StyleSheet.create({
  form: { gap: 14 },
  note: {
    backgroundColor: '#e9f0ff',
    padding: 12,
    borderRadius: 11,
    fontSize: 11,
    lineHeight: 16,
  },
})
