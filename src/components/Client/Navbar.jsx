import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
  CLIENT_DASHBOARD_LINK,
  CLIENT_DOCTORS_LINK,
  CLIENT_PATIENTS_LINK,
  CLIENT_DEPARTMENTS_LINK,
} from '../../services/constants/links'
import {
  createStyles,
  Header,
  Container,
  Group,
  Burger,
  Paper,
  Transition,
  Avatar,
  Divider,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import Logo from '../Logo'
import { TbLogout } from 'react-icons/tb'
import { adminNavLinks } from '../../services/constants/navLinks'

const HEADER_HEIGHT = 70

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    zIndex: 1,
  },

  dropdown: {
    position: 'absolute',
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },

    [theme.fn.smallerThan('sm')]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({
        variant: 'light',
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
        .color,
    },
  },
}))

const Navbar = () => {
  const [opened, { toggle, close }] = useDisclosure(false)

  const [active, setActive] = useState('')

  const { classes, cx } = useStyles()

  const location = useLocation()

  const items = adminNavLinks.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={cx(classes.link, {
        [classes.linkActive]: active === link.link,
      })}
      onClick={() => {
        setActive(link.link)
        close()
      }}
    >
      {link.label}
    </a>
  ))

  useEffect(() => {
    const setActiveLink = () => {
      switch (location.pathname) {
        case CLIENT_DASHBOARD_LINK:
          setActive(CLIENT_DASHBOARD_LINK)
          break
        case CLIENT_DOCTORS_LINK:
          setActive(CLIENT_DOCTORS_LINK)
          break
        case CLIENT_PATIENTS_LINK:
          setActive(CLIENT_PATIENTS_LINK)
          break
        case CLIENT_DEPARTMENTS_LINK:
          setActive(CLIENT_DEPARTMENTS_LINK)
          break
      }
    }

    setActiveLink()
  }, [location])

  return (
    <Header height={HEADER_HEIGHT} mb={30} className={classes.root}>
      <Container size={1250} className={classes.header}>
        <Logo />

        <Group>
          <Group spacing={8} className={classes.links}>
            {items}
          </Group>

          <Divider orientation="vertical" />

          <Avatar color="cyan" radius="xl">
            MK
          </Avatar>
          <TbLogout size={24} color="gray" />
        </Group>

        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="sm"
        />

        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items}
            </Paper>
          )}
        </Transition>
      </Container>
    </Header>
  )
}

export default Navbar
