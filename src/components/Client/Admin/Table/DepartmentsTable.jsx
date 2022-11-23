import { useState } from 'react'
import {
  createStyles,
  Table,
  ScrollArea,
  Center,
  Paper,
  Title,
  Stack,
  Button,
  Group,
  Modal,
  TextInput,
  PasswordInput,
  useMantineTheme,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { TbMail } from 'react-icons/tb'
import { TbLock } from 'react-icons/tb'

const useStyles = createStyles((theme) => ({
  header: {
    position: 'sticky',
    top: 0,
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'box-shadow 150ms ease',

    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[3]
          : theme.colors.gray[2]
      }`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}))

const data = [
  { id: 1, name: 'Maria Dela cruz', email: 'mdc.doctor@email.com' },
  { id: 2, name: 'Juan Dela Cruz', email: 'jdc@email.com' },
  { id: 2, name: 'Juan Dela Cruz', email: 'jdc@email.com' },
  { id: 2, name: 'Juan Dela Cruz', email: 'jdc@email.com' },
  { id: 2, name: 'Juan Dela Cruz', email: 'jdc@email.com' },
  { id: 2, name: 'Juan Dela Cruz', email: 'jdc@email.com' },
  { id: 2, name: 'Juan Dela Cruz', email: 'jdc@email.com' },
  { id: 2, name: 'Juan Dela Cruz', email: 'jdc@email.com' },
  { id: 2, name: 'Juan Dela Cruz', email: 'jdc@email.com' },
  { id: 2, name: 'Juan Dela Cruz', email: 'jdc@email.com' },
]

const DepartmentsTable = () => {
  const [opened, setOpened] = useState(false)
  const { classes, cx } = useStyles()
  const [scrolled, setScrolled] = useState(false)
  const theme = useMantineTheme()

  const rows = data.map((row) => (
    <tr key={row.name}>
      <td>{row.id}</td>
      <td>{row.name}</td>
      <td>{row.email}</td>
    </tr>
  ))

  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },

    validate: {
      email: (value) => (value === '' ? 'Invalid email' : null),
      password: (value) => (value === '' ? 'Invalid password' : null),
    },
  })

  return (
    <div>
      <Modal
        overlayColor={
          theme.colorScheme === 'dark'
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        overlayOpacity={0.55}
        overlayBlur={3}
        centered
        opened={opened}
        title="Add New Doctor"
        onClose={() => setOpened(false)}
        size="auto"
      >
        <form
          onSubmit={form.onSubmit((values) => {
            form.reset()
          })}
        >
          <Group mb="sm">
            <TextInput
              required
              label="First Name"
              {...form.getInputProps('firstName')}
            />
            <TextInput
              required
              label="Last Name"
              {...form.getInputProps('lastName')}
            />
          </Group>

          <TextInput
            required
            label="Email"
            mb="sm"
            icon={<TbMail size={16} />}
            {...form.getInputProps('email')}
          />

          <PasswordInput
            required
            mb="sm"
            label="Password"
            icon={<TbLock size={16} />}
            {...form.getInputProps('password')}
          />

          <PasswordInput
            required
            mb="xl"
            label="Confirm Password"
            icon={<TbLock size={16} />}
            {...form.getInputProps('confirmPassword')}
          />

          <Button
            variant="gradient"
            gradient={{ from: 'indigo', to: 'cyan' }}
            fullWidth={true}
          >
            Add Department
          </Button>
        </form>
      </Modal>

      <Center>
        <Stack>
          <Group position="apart">
            <Title order={2}>Departments</Title>
            <Button
              variant="gradient"
              gradient={{ from: 'indigo', to: 'cyan' }}
              onClick={() => setOpened(true)}
            >
              Add Department
            </Button>
          </Group>

          <Paper shadow="xs" p="md">
            <ScrollArea
              sx={{ height: 450 }}
              onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
            >
              <Table sx={{ minWidth: 1000 }} verticalSpacing="md">
                <thead
                  className={cx(classes.header, {
                    [classes.scrolled]: scrolled,
                  })}
                >
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>{rows}</tbody>
              </Table>
            </ScrollArea>
          </Paper>
        </Stack>
      </Center>
    </div>
  )
}

export default DepartmentsTable
