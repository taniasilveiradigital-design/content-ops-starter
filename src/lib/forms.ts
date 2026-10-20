// Envia formulários para o Netlify Forms. Os formulários estão declarados em public/__forms.html.
export async function submitNetlifyForm(formName: string, data: Record<string, string>) {
    const body = new URLSearchParams({ 'form-name': formName, ...data }).toString();
    const res = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body
    });
    if (!res.ok) throw new Error(`Falha no envio (${res.status})`);
}
