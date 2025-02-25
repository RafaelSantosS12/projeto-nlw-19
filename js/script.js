const app = document.querySelector("#app");

// Array de usuários
const users = [
    {
        email: 'test@test.com',
        phone: '99999999999',
        ref: 100,
        refBy: null
    },
    {
        email: 'tust@tust.com',
        phone: '99999999999',
        ref: 200,
        refBy: 100
    },
    {
        email: 'tost@tost.com',
        phone: '99999999999',
        ref: 300,
        refBy: 100
    }
];

const getTotalSubscribers = (userData) => {
    const subs = users.filter((user) => {
        return user.refBy == userData.ref;
    });
    return subs.length;
}

const getUser = (userData) => {
    return users.find((user) => {
        return user.email === userData.email
}   );
}

const showInvite = (userData) => {
    app.innerHTML = `

    <main>
        <h3>Inscrição Confirmada</h3>

        <p>Convide mais pessoas e concorra a prêmios! <br> Compartilhe o link e acompanhe as inscrições:</p>
        <div class="input-group">
            <label for="link">
                <img src="/assets/images/link.svg" alt="Link icon">
            </label>
            <input type="text" id="link" value="https://evento.com?ref=${userData.ref}" disabled>
        </div>
    </main>

    <section class="stats">
        <div id="stats">
        <h4>${getTotalSubscribers(userData)}</h4>
        <p>Inscrições feitas</p>
        </div>
    </section>
    `

    app.setAttribute('class', 'page-invite');
    updateImageLinks();
}

const saveUser = (userData) => {
    const newUser = {
        ...userData,
        ref: Math.round(Math.random() * 4000),
        refBy: 100
    }

    users.push(newUser);
    console.log(users);
    return newUser;
}

const formAction = () => {
    const form = document.querySelector("#form");

    form.onsubmit = (event) => { 
        event.preventDefault();

        const formData = new FormData(form);
        const userData = {
            email: formData.get('email'), 
            phone: formData.get('phone'),
        };

        const user = getUser(userData);
        if(user){
            showInvite(user);
        }else{
            const newUser = saveUser(userData);
            showInvite(newUser);
        }
    };
}

 /*const updateImageLinks = () => {
    document.querySelectorAll('img').forEach((img) => {
        if(img.src.includes('githubusercontent')){
            return;
        }
        img.src = `https://github.com/maykbrito/my-public-files/tree/main/nlw-19${img.src}`
    });
}
*/

const startApp = () => {
    const content = `
    <main>
        <section class="about">
            <div class="section-header">
                <h2>Sobre o evento</h2>
                <span class="badge">AO VIVO</span>
            </div>

            <p>Um evento feito por e para pessoas desenvolvedoras apaixonadas por criar soluções inovadoras e compartilhar conhecimento. Vamos mergulhar nas tendências mais recentes em desenvolvimento de software, arquitetura de sistemas e tecnologias emergentes, com palestras, workshops e hackathons.
            <br><br> Dias 15 a 17 de março | Das 18h às 21h | Online & Gratuito </p>
        </section>

        <section class="registration">
            <h2>Inscrição</h2>

            <form id="form">
                <div class="input-wrapper">
                    <div class="input-group">
                        <label for="email">
                            <img src="/assets/images/mail.svg" alt="Email icon">
                        </label>
                        <input type="email" name="email" id="email" placeholder="E-mail">
                    </div>

                    <div class="input-group">
                        <label for="phone">
                            <img src="/assets/images/phone.svg" alt="phone icon">
                        </label>
                        <input type="phone" name="phone" id="phone" placeholder="Telefone">
                    </div>
                </div>

                <button>
                    Confirmar
                    <img src="/assets/images/arrow.svg" alt="Arrow rigth">
                </button>
            </form>
        </section>
    </main>
    `;

    app.innerHTML = content;
    app.setAttribute('class', 'page-statj');
    formAction();
}

const header = document.querySelector("header").onclick= startApp;

startApp()
/* showInvite({
    email: 'test@test.com',
    phone: '9999999999',
    ref: '100'
}); */
