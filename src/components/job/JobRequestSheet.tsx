import React from 'react'
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import { X } from 'lucide-react-native'
import { JobRequest } from '../../hooks/useJobRequest'
import { useTheme } from '../../theme/ThemeContext'
import { typography } from '../../theme/typography'
import { CategoryPicker } from './CategoryPicker'
import { JobForm } from './JobForm'
import { RequestSentMessage } from './RequestSentMessage'

type Props = {
  request: JobRequest
}

export function JobRequestSheet({ request }: Props) {
  const { colors } = useTheme()
  const { visible, category, sent, details, close, selectCategory, updateDetail, submit } = request

  const title = sent
    ? 'Request sent'
    : category
      ? `${category} job details`
      : 'What do you need help with?'

  const renderBody = () => {
    if (sent) return <RequestSentMessage />
    if (category) {
      return (
        <JobForm category={category} details={details} onChange={updateDetail} onSubmit={submit} />
      )
    }
    return <CategoryPicker onSelect={selectCategory} />
  }

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={close}>
      <View style={styles.backdrop}>
        <View style={[styles.sheet, { backgroundColor: colors.surface }]}>
          <View style={styles.header}>
            <View>
              <Text style={[typography.eyebrow, { color: colors.accent }]}>MEORTRA</Text>
              <Text style={[typography.sheetTitle, { color: colors.ink }]}>{title}</Text>
            </View>
            <Pressable accessibilityLabel="Close" onPress={close}>
              <X size={20} color={colors.ink} />
            </Pressable>
          </View>
          {renderBody()}
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, justifyContent: 'flex-end', backgroundColor: '#10182766' },
  sheet: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 22,
    minHeight: 350,
    maxHeight: '88%',
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
})
