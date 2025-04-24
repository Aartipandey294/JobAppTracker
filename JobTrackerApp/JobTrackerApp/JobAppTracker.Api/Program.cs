using JobAppTracker.Application;
using JobAppTracker.Application.Interfaces;
using JobAppTracker.Infrastructure.Data;
using JobAppTracker.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "JobAppTracker API",
        Version = "v1",
        Description = "API for managing job applications"
    });
});

builder.Services.AddDbContext<AppDbContext>(options =>
     options.UseSqlite("Data Source=jobapptracker.db"));
builder.Services.AddScoped<IJobApplicationService, JobApplicationService>();


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Enable Swagger in development
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowFrontend");

app.UseAuthorization();

app.MapControllers();

app.Run();
