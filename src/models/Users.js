'use strict'
const Users = class {
    constructor(name, lastname, email, password, status, roles, createdBy, updatedBy, createdAt, updatedAt) {
        this.name = name
        this.lastname = lastname
        this.email = email
        this.password = password || null
        this.status = status || true
        this.roles = roles || "ADMIN"
        this.createdBy = createdBy
        this.updatedBy = updatedBy
        this.createdAt = new Date().toISOString()
        this.updatedAt = updatedAt || null
    }
    fullName() {
        return `${this.name} ${this.lastname}`
    }
}

module.exports = Users