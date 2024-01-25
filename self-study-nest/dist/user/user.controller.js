"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const swagger_1 = require("@nestjs/swagger");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    getUsers() {
        return this.userService.getAll();
    }
    addUser(createUserDto) {
        return this.userService.create(createUserDto);
    }
    updateUser(userId, updateUserDto) {
        console.log(updateUserDto);
        return this.userService.update(userId, updateUserDto);
    }
    getUserById(userId) {
        return this.userService.getOne(userId);
    }
    deleteUserById(userId) {
        return this.userService.delete(userId);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)('/'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all the ussers' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'All data list'
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Forbidden'
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'create new record' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                    example: 'John',
                    description: 'this is name'
                },
                email: {
                    type: 'string',
                    example: 'john@mail.com',
                    description: 'this is email'
                },
                age: {
                    type: 'integer',
                    example: 20,
                    description: 'this is age'
                },
                password: {
                    type: 'string',
                    example: '1234',
                    description: 'this is password'
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'saved',
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Forbidden'
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "addUser", null);
__decorate([
    (0, common_1.Put)('/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'update record' }),
    (0, swagger_1.ApiParam)({
        name: 'userId',
        type: 'integer',
        description: 'this is unique id',
        required: true
    }),
    (0, swagger_1.ApiBody)({ type: update_user_dto_1.UpdateUserDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'updated',
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Forbidden'
    }),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Post)('/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'view record' }),
    (0, swagger_1.ApiParam)({
        name: 'userId',
        type: 'integer',
        description: 'this is unique id',
        required: true
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Deleted'
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Forbidder'
    }),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUserById", null);
__decorate([
    (0, common_1.Delete)('/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'delete record' }),
    (0, swagger_1.ApiParam)({
        name: 'userId',
        type: 'integer',
        description: 'this is unique id',
        required: true
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Deleted'
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Forbidder'
    }),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "deleteUserById", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiTags)('User Test'),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map