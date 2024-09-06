import { expect, test } from '@playwright/test'

test('Should not able to list transactions', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  const toast = page.getByText('Make your first transaction')

  await expect(toast).toBeVisible()
})

test('Should able to register a transaction', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await page.getByRole('button', { name: 'New transaction' }).click()
  await page.getByRole('textbox', { name: 'Title' }).fill('New Title')
  await page.getByRole('textbox', { name: 'Price' }).fill('500')
  await page.getByRole('radio', { name: 'Income' }).click()
  await page.getByRole('button', { name: 'Register' }).click()

  await page.getByRole('button', { name: 'Close' }).click()

  const toast = page.getByText('Transaction has been created.')
  const transaction1 = page.getByRole('cell', { name: 'Title number 0' })
  const detailsButton = page.getByRole('button', { name: 'Details' }).first()

  await expect(toast).toBeVisible()
  await expect(transaction1).toBeVisible()
  await expect(detailsButton).toBeVisible()
})

test('Should not register without the mandatory fields a transaction', async ({
  page,
}) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await page.getByRole('button', { name: 'New transaction' }).click()
  await page.getByRole('button', { name: 'Register' }).click()

  let titleError = page.getByText('Please enter more than 4')
  let priceError = page.getByText('Please enter a number')
  const typeError = page.getByText('Required')

  await expect(titleError).toBeVisible()
  await expect(priceError).toBeVisible()
  await expect(typeError).toBeVisible()

  await page
    .getByRole('textbox', { name: 'Title' })
    .fill(
      'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    )
  await page.getByRole('textbox', { name: 'Price' }).fill('string')

  titleError = page.getByText('Please enter a lower title')
  priceError = page.getByText('Please enter a number')

  await expect(titleError).toBeVisible()
  await expect(priceError).toBeVisible()

  await page.getByRole('textbox', { name: 'Price' }).fill('0')

  priceError = page.getByText('Please enter a bigger number')

  await page.getByRole('textbox', { name: 'Price' }).fill('1000000')

  priceError = page.getByText('Please enter a lower number')

  await expect(titleError).toBeVisible()
  await expect(priceError).toBeVisible()

  // await page.waitForTimeout(2000)
})
