import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { VStack, TextField, Button, Text } from '../'
import { Form, type IFormProps } from '.'

const meta: Meta<typeof Form> = {
  title: 'SwiftUI/Form',
  component: Form,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A container for grouping form controls. Form provides a semantic container for form elements and handles form submission.'
      }
    }
  }
}

export default meta

type Story = StoryObj<IFormProps>

function DefaultForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  return (
    <Form onSubmit={(e) => {
      e.preventDefault()
      alert(`Name: ${name}, Email: ${email}`)
    }}>
      <VStack spacing={16}>
        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
        />
        <Button type="submit">Submit</Button>
      </VStack>
    </Form>
  )
}

export const Default: Story = {
  render: () => <DefaultForm />
}

function WithValidationForm() {
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!name.trim()) {
      setError('Name is required')
      return
    }
    setError('')
    alert(`Submitted: ${name}`)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <VStack spacing={16}>
        <TextField
          value={name}
          onChange={(e) => {
            setName(e.target.value)
            setError('')
          }}
          placeholder="Name"
        />
        {error && <Text style={{ color: '#FF3B30' }}>{error}</Text>}
        <Button type="submit">Submit</Button>
      </VStack>
    </Form>
  )
}

export const WithValidation: Story = {
  render: () => <WithValidationForm />
}

function ComplexFormComponent() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  })

  return (
    <Form onSubmit={(e) => {
      e.preventDefault()
      alert(JSON.stringify(formData, null, 2))
    }}>
      <VStack spacing={20}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Contact Form</Text>
        <TextField
          value={formData.firstName}
          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          placeholder="First Name"
        />
        <TextField
          value={formData.lastName}
          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          placeholder="Last Name"
        />
        <TextField
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Email"
          type="email"
        />
        <TextField
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Message"
        />
        <Button type="submit">Send Message</Button>
      </VStack>
    </Form>
  )
}

export const ComplexForm: Story = {
  render: () => <ComplexFormComponent />
}

