import AddToPhotosIcon from '@mui/icons-material/AddToPhotos'
import DescriptionIcon from '@mui/icons-material/Description'
import ErrorIcon from '@mui/icons-material/Error'
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
} from '@mui/material'
import { useContext } from 'react'

import { addQuestion as addQuestionAction } from '@/redux/quizForm/quizFormSlice'
import { useAppDispatch, useAppSelector } from '@/redux/reduxHooks'

import { QuizFormContext } from '../QuizFormContext'

const DrawerList = (): JSX.Element => {
  const { submit, activeTab, setActiveTab } = useContext(QuizFormContext)

  const { quizDescription, questions } = useAppSelector(
    ({ quizFormState }) => quizFormState,
  )
  const dispatch = useAppDispatch()

  function addQuestion(): void {
    const newActiveTab = questions.length

    dispatch(addQuestionAction())
    setActiveTab(newActiveTab)
  }

  const questionHasError = (idx: number): boolean =>
    Object.keys(questions[idx].errors).length > 0

  const quizDescriptionHasError = Object.keys(quizDescription.errors).length > 0

  return (
    <Box
      sx={{ mt: { sm: 10, xs: 0 } }}
      className="flex flex-col justify-between h-full"
    >
      <div>
        <List>
          <ListItem disablePadding>
            <ListItemButton
              selected={activeTab === -1}
              className={
                quizDescriptionHasError && activeTab !== -1 ? 'bg-red-50' : ''
              }
              onClick={() => {
                setActiveTab(-1)
              }}
            >
              <ListItemIcon className="inline-flex items-center">
                {quizDescriptionHasError && (
                  <ErrorIcon fontSize="small" color="error" className="mr-2" />
                )}
                <DescriptionIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={'Описание теста'} />
            </ListItemButton>
          </ListItem>
        </List>

        <Divider className="mx-3" />

        <List className="py-0">
          {questions.map((question, idx) => (
            <ListItem key={idx} disablePadding>
              <ListItemButton
                selected={idx === activeTab}
                className={
                  questionHasError(idx) && idx !== activeTab ? 'bg-red-50' : ''
                }
                onClick={() => {
                  setActiveTab(idx)
                }}
              >
                {questionHasError(idx) && (
                  <ErrorIcon fontSize="small" color="error" className="mr-2" />
                )}

                <ListItemText>{`${idx + 1}. ${question.title}`}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </div>

      <div className="space-y-3 p-3">
        <Button
          variant="contained"
          color="secondary"
          className="w-full"
          onClick={() => {
            addQuestion()
          }}
        >
          <AddToPhotosIcon fontSize="small" className="mr-4" />
          Добавить вопрос
        </Button>
        <Button variant="contained" onClick={submit} className="w-full">
          Создать тест
        </Button>
      </div>
    </Box>
  )
}

export default DrawerList
