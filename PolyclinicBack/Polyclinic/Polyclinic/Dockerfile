#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 5000
EXPOSE 5001

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["Polyclinic/Polyclinic.csproj", "Polyclinic/"]
COPY ["Polyclinic.DataAccess/Polyclinic.DataAccess.csproj", "Polyclinic.DataAccess/"]
COPY ["Polyclinic.Core/Polyclinic.Core.csproj", "Polyclinic.Core/"]
RUN dotnet restore "./Polyclinic/Polyclinic.csproj"
COPY . .
WORKDIR "/src/Polyclinic"
RUN dotnet build "./Polyclinic.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./Polyclinic.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Polyclinic.dll"]