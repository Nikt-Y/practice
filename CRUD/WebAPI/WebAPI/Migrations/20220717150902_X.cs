using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace WebAPI.Migrations
{
    public partial class X : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    productName = table.Column<string>(type: "text", nullable: true),
                    supplierID = table.Column<int>(type: "integer", nullable: true),
                    quantityPerUnit = table.Column<string>(type: "text", nullable: true),
                    unitPrice = table.Column<int>(type: "integer", nullable: true),
                    unitsInStock = table.Column<int>(type: "integer", nullable: true),
                    unitsOnOrder = table.Column<int>(type: "integer", nullable: true),
                    reorderLevel = table.Column<int>(type: "integer", nullable: true),
                    discontinued = table.Column<bool>(type: "boolean", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Products");
        }
    }
}
