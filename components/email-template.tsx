interface ConfirmEmailTemplateProps {
  confirmUrl: string;
}

export function ConfirmEmailTemplate({ confirmUrl }: ConfirmEmailTemplateProps) {
  return (
    <div>
      <h1>Confirm your new email</h1>
      <p>Click the link below to confirm your new email address:</p>
      <a href={confirmUrl}>Confirm email</a>
      <p>If you didn't request this, ignore this email.</p>
    </div>
  );
}