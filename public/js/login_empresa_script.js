const form = document.getElementById('loginForm')

form.addEventListener('submit', async (evt)=>{
    evt.preventDefault()
    try {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        const res = await fetch('/api/empresa/login',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                email: data.email,
                senha: data.senha
            })
        })
        const json = await res.json()
        document.cookie = `token=${json.token}; path=/; Secure; SameSite=Strict`;
        const resProfile = await fetch('/api/empresa/profile',{
            headers: { Authorization: `Bearer ${json.token}` }
        })
        const jsonProfile = await resProfile.json()
        localStorage.setItem('id', jsonProfile.id)
        window.location.href = '/empresa';
    } catch (error) {
        console.error(error)
    }
})