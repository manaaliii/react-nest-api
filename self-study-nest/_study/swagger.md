## What is Swagger ?

## Header for the controller
- @ApiTags(header string)


### In DTOs
- @ApiProperty({type: dtype}) - this make dto property available to our endpoint
- for array we have to use it like :
```bash
  @ApiProperty({type: [dataType]})
```
- for circular dependencies :
```bash
  @ApiProperty({ type: () => Node })
  node: Node
 ```
- enum :
```bash
  @ApiProperty({ enum: ['Admin', 'Moderator', 'User']})
  role: UserRole; 
  OR 
  @ApiProperty({ enum: UserRole, enumName: 'userRole'})
  role: UserRole; 
  
```

##### HINT
```bash
Instead of explicitly typing the @ApiProperty({ required: false }) you can use the @ApiPropertyOptional() 
short-hand decorator.
```


### Decorator - ApiBody
- @ApiBody()
- @ApiBody({type:[OutDto})
- @ApiBody({type, properties)

### Decorator - ApiHeader
- name and description are the main attributes.


### Decorator - ApiResponse
- @ApiResponse({status, description})

