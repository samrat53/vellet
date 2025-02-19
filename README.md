# 🚀 Vellet - Distributed Transaction Wallet System  🚀

## 📌 Overview  
**Vellet** is a **distributed transaction wallet application** designed for seamless, reliable, and high-availability financial transactions. It supports peer-to-peer money transfers and bank-to-wallet transactions while ensuring **fault tolerance and consistency** in a distributed environment.

The system follows a **microservices-inspired architecture**, leveraging **event-driven processing** to handle transaction failures and retries efficiently. It is built using **Next.js**, **Express.js**, **TypeScript**, **Redis**, **PostgreSQL**, and **Prisma ORM**, ensuring a scalable, maintainable, and performant backend.

---

## 🏗️ System Architecture  
![System architechture of the app](system-architechture/project-architechture.svg)

---

### **📌 Architecture Highlights:**  
✅ **Asynchronous Transaction Processing:** Uses **Redis-based queues** to queue transactions when the **bank server is unavailable**, ensuring **100% durability** and processing them when the system recovers.  

✅ **Real-Time Event Handling:** Once a bank transaction is processed, the result is **published to another queue**, which is consumed by the wallet server to **update user balances instantly**.  

✅ **Fault-Tolerant Design:** Implements **server-side caching (LRU)** in the bank server to minimize database load and enhance **response time** by reducing redundant user verification queries.  

✅ **Automated Notifications:** A dedicated **worker server** listens to completed transaction events and **sends real-time email notifications** to users, ensuring a seamless banking experience.  

✅ **Efficient Resource Utilization:** The system optimizes transaction handling using **lazy processing and queue-based execution**, preventing **database congestion** and improving **overall throughput**.  

By implementing these distributed system principles, Vellet ensures reliability, scalability, and fault tolerance in financial transactions, making it a highly efficient and modern digital wallet solution.

---
## Features  

### ✅ **Core Functionalities**  
- **Peer-to-Peer Transfers** between wallet users.  
- **Deposit & Withdraw Money** between wallet and bank.
- **Dashboard and token based authentication** in the wallet using bank account number.  
- **Resilient Transactions:**  
  - If the **bank server is down**, transactions are **queued in Redis**.  
  - When the bank server is back, it **processes queued transactions**.  
  - Transaction updates are **pushed to another queue** and **consumed by the wallet app** to update balances.  
- **Email Notifications**: A **worker service** listens for processed transactions and **sends real-time notifications**.  

### ⚡ **Performance Optimizations**  
- **Asynchronous transaction handling using Redis queues.**  
- **Server-side caching (LRU) in the bank server** to **reduce DB queries by ~40%**.  
- **Event-driven design ensures eventual consistency and scalability.**  

---

## 🛠️ Tech Stack  
|       Category           | Technologies Used
|--------------------------|--------------------------------------------------------
| **Frontend**             | Next.js (Wallet frontend & backend integrated together)
| **Backend**              | Express.js (Bank Server)
| **Database**             | PostgreSQL (Prisma ORM)
| **Message Queue**        | Redis
| **Caching**              | Redis (LRU Policy)
| **Authentication**       | JWT (JSON Web Tokens)
| **Email Notifications**  | Nodemailer

---

## 🚀 Getting Started  

### **1️⃣ Prerequisites**  
Ensure you have the following installed:  
- [Next.js](https://nextjs.org/docs)
- [Node.js](https://nodejs.org/) (v16+)  
- [Redis](https://redis.io/)  
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/) (Optional for Redis & PostgreSQL)  

### **2️⃣ Clone the Repository**  
```bash
git clone https://github.com/samrat53/vellet.git
cd vellet
```

### **3️⃣ Manual Setup Guide: Install Dependencies**  
```bash
# Install dependencies for the Wallet App
cd wallet-app
npm install

# Install dependencies for the Bank Server
cd ../bank-server
npm install

# Install dependencies for Worker Service
cd ../worker-notifications
npm install
```

### **4️⃣ Setup Environment Variables**  
Create a `.env` file in each service directory and add:  
```env
# In wallet-app
DATABASE_URL="postgresql://user:password@localhost:5432/vellet_wallet_db"
NEXTAUTH_SECRET="your-secure-random-secret"
NEXTAUTH_URL="http://localhost:3000"
BANK_SERVER="http://localhost:8080/api/v1"
REDIS_HOST="localhost"
REDIS_PORT=6379

# In Dummy bank server
DATABASE_URL="postgresql://user:password@localhost:5432/vellet_bank_db"
PORT=8080
JWT_SECRET="your-secure-random-secret"
REDIS_HOST="localhost"
REDIS_PORT=6379

# In worker-notifications
REDIS_HOST="localhost"
REDIS_PORT=6379
EMAIL_HOST="smtp.gmail.com"
EMAIL_SENDER_ID="your-email@gmail.com"
EMAIL_SENDER_PASSWORD="your-app-password"

```

### **5️⃣ Start Services**  
#### **Start the redis service using docker** 
```bash
docker run -d --name redis-stack-server -p 6379:6379 redis/redis-stack-server:latest
```

#### **Start the Wallet App**  
```bash
cd wallet-app
npx prisma generate
npx prisma migrate dev --name "init"
npm run dev 
```

#### **Start the Bank Server**  
```bash
cd ../bank-server
npx prisma generate
npx prisma migrate dev --name "init"
npm start server
```

#### **Start the Worker Service**  
```bash
cd ../worker
npm start worker
```

---

## 📡 API Endpoints exposed by Bank

| Method |      Endpoint           |           Description               |
|--------|-------------------------|-------------------------------------|
| `POST` | `/api/v1/verify-user/:id` | Verifies users during signups.          |
| `GET`  | `/api/v1/transfer/:id` | Handles debit and credit of money from the bank.         |

---

## 🛠️ System Workflow  

### **Prerequisites**  
- The user has a **bank account number** validated by the **Bank Server**.  
- The user **signs in** using the same bank account number.  
- Authentication is handled via a **signed token stored in cookies**, ensuring secure transactions.  
- The user can **send and receive money** from other users within the wallet using their **account number**.  

### **Transaction Flow**  

1️⃣ **User initiates a transaction** (deposit/withdrawal) in the **Wallet App**.  
2️⃣ If the **Bank Server is online**, it **directly processes** the request.  
3️⃣ If the **Bank Server is down**, the request is **queued in Redis** for later processing.  
4️⃣ When the **Bank Server comes back online**, it **consumes queued transactions** and processes them.  
5️⃣ After processing, the **Bank Server pushes transaction details to another Redis queue** for real-time updates.  
6️⃣ The **Wallet App consumes this queue** and **updates user balances** accordingly.  
7️⃣ A separate **Worker Service listens for processed transactions** and **sends email notifications** to users.

---

## ⚡ Performance Optimizations  

- **Reduced DB Calls**: Implemented **Redis-based LRU caching** in the bank server, reducing **DB queries by ~40%**.  
- **High Availability**: Transactions **never fail due to server downtime** as they are **queued and processed later**.  
- **Event-Driven Processing**: Instead of blocking API calls, all transactions **are handled asynchronously**.  

---

## 🧑‍💻 Future Enhancements  

🔹 **WebSockets for Real-Time Updates** (Instead of polling for status updates).  
🔹 **Multi-Currency Support** (Handle INR, USD, etc.).  
🔹 **Fraud Detection System** (Detect unusual spending patterns).  
🔹 **Rate Limiting & Security Hardening** (Prevent API abuse).  

---


- 👤 **Author:** [Samrat Bhattacharya](https://github.com/samrat53)
- 👤 **Author Contact:** [LinkedIn](https://linkedin.com/in/samrat-bhattacharya)
- 👤 **Author Resume Link:** [Resume](https://drive.google.com/file/d/1QS9tBzlStf0e2JV67kHEIpzK6TlRV4tI/view?usp=sharing) 
---