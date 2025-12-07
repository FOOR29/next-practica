# Proyecto de next crud + autheticacion con jwt

### dependencias necesarias para futuros proyectos:

nexth auth la beta

```bash
npm install next-auth@beta
```

zod para validaciones

```bash
npm install zod
```

hook form + resolves para crear los formularios

```bash
npm i @hookform/resolvers
```

byscrip para hashear las contraseñas

```bash
npm i bcryptjs
```

prisma y prisma client en su version 5 mas estable

```bash
npm install @prisma/client@5.16.1

npm install prisma@5.16.1 --save-dev
```

depues de instalar primsa se inicializa com:

```bash
npx prisma init --datasource-provider mysql
```

y una ves editado el schema se genera

```bash
npx prisma generate
```

y se envia todo a la base de datos con:

```bash
npx prisma db push
```

> no olvidarse del comando:

```bash
npx auth secret
```
para generat el .env

---

## paso 2

ya a partir de aqui la solo es copiar y pegar cada componnete y adaptarlo a lo que se necesita



