import type { RequestLike, ResponseLike } from './templates'
import { ERROR } from '../lib/templates/validation'
import { validateTemplateSchema } from '../lib/templates/schema-validate'

export async function handleValidateTemplateSchema(req: RequestLike): Promise<ResponseLike> {
  const body = (req.body ?? {}) as any
  const schema = body?.schema
  const result = validateTemplateSchema(schema)
  if (!result.valid) {
    return { status: 422, body: { code: ERROR.VALIDATION_ERROR, message: 'Invalid schema', details: { errors: result.errors } } }
  }
  return { status: 200, body: { valid: true, warnings: result.warnings.length ? result.warnings : undefined } }
}

