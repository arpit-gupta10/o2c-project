using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);
// CORS first
builder.Services.AddCors(options =>
{
    options.AddPolicy("angular",
        policy => policy
            .WithOrigins("http://localhost:4200")
            .AllowAnyHeader()
            .AllowAnyMethod());
});

var key = "SUPER_SECRET_ASSIGNMENT_KEY_12345";

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
.AddJwtBearer(o =>
{
    o.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key))
    };
});

builder.Services.AddAuthorization();

var app = builder.Build();
app.UseCors("angular");
app.UseAuthentication();
app.UseAuthorization();


// ---------------- MOCK DATA ----------------

var users = new List<User>
{
    new("admin@test.com","1234","Admin"),
};

var products = new List<Product>
{
    new("SKU1","Laptop",50000,true),
    new("SKU2","Phone",20000,true),
    new("SKU3","TV",30000,false),
};

var orders = new List<Order>();
var payments = new List<Payment>();


// ---------------- AUTH ----------------

app.MapPost("/login", (LoginDto dto) =>
{
    var user = users.FirstOrDefault(x =>
        x.Email == dto.Email && x.Password == dto.Password);

    if (user == null)
        return Results.Unauthorized();

    var claims = new[]
    {
        new Claim(ClaimTypes.Email, user.Email),
        new Claim(ClaimTypes.Role, user.Role)
    };

    var token = new JwtSecurityToken(
        claims: claims,
        expires: DateTime.UtcNow.AddHours(2),
        signingCredentials: new SigningCredentials(
            new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key)),
            SecurityAlgorithms.HmacSha256)
    );

    return Results.Ok(new
    {
        token = new JwtSecurityTokenHandler().WriteToken(token),
        role = user.Role
    });
});

app.MapPost("/register", (LoginDto dto) =>
{
    users.Add(new User(dto.Email, dto.Password, "Customer"));
    return Results.Ok();
});

app.MapGet("/me", (ClaimsPrincipal user) =>
{
    return Results.Ok(new
    {
        email = user.Identity?.Name,
        role = user.Claims.First(x => x.Type == ClaimTypes.Role).Value
    });
}).RequireAuthorization();


// ---------------- CATALOG (CQRS READ) ----------------

app.MapGet("/catalog/items", () => products);

app.MapGet("/catalog/items/{sku}", (string sku) =>
{
    var item = products.FirstOrDefault(x => x.Sku == sku);
    return item is null ? Results.NotFound() : Results.Ok(item);
});


// ---------------- ORDER COMMAND /Checkout----------------

app.MapPost("/orders/place", (OrderDto dto) =>
{
    var id = Guid.NewGuid().ToString();

    orders.Add(new Order(id, dto.Items, "Processing"));

    return Results.Ok(new { orderId = id });
}).RequireAuthorization();


// ---------------- PAYMENT COMMAND ----------------

app.MapPost("/payments/pay", (PayDto dto) =>
{
    var pid = Guid.NewGuid().ToString();

    payments.Add(new Payment(pid, dto.OrderId, "Success"));

    return Results.Ok(new { paymentId = pid });
}).RequireAuthorization();

app.MapGet("/orders/history", () => orders).RequireAuthorization();//getOrders()

app.Run();


// ---------------- RECORDS ----------------

record User(string Email, string Password, string Role);
record Product(string Sku, string Name, decimal Price, bool Available);
record Order(string Id, List<string> Items, string Status);
record Payment(string Id, string OrderId, string Status);

record LoginDto(string Email, string Password);
record OrderDto(List<string> Items);
record PayDto(string OrderId);
