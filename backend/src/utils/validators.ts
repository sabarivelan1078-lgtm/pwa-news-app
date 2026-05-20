import Joi from 'joi';

export const validateFeedRefreshInterval = (interval: number): { valid: boolean; error?: string } => {
  const schema = Joi.number().min(30).max(45).required();
  const { error } = schema.validate(interval);
  if (error) {
    return { valid: false, error: error.message };
  }
  return { valid: true };
};

export const validateSourceURL = (url: string): { valid: boolean; error?: string } => {
  const schema = Joi.string().uri().required();
  const { error } = schema.validate(url);
  if (error) {
    return { valid: false, error: error.message };
  }
  return { valid: true };
};

export const validateTopic = (topic: string): { valid: boolean; error?: string } => {
  const schema = Joi.string().min(1).max(100).required();
  const { error } = schema.validate(topic);
  if (error) {
    return { valid: false, error: error.message };
  }
  return { valid: true };
};
