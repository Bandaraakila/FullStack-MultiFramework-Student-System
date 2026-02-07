using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using dotnet_api.Data;
using dotnet_api.Models;
using Microsoft.AspNetCore.Authorization;

namespace dotnet_api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public StudentsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Student>>> GetStudents()
        {
            return await _context.Students.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Student>> GetStudent(int id)
        {
            var student = await _context.Students.FindAsync(id);
            if (student == null) return NotFound(new { message = "Student not found" });
            return student;
        }

        [HttpPost]
        public async Task<ActionResult<Student>> PostStudent(Student student)
        {
            _context.Students.Add(student);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetStudent), new { id = student.StudentId }, student);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutStudent(int id, Student student)
        {
            if (id != student.StudentId) return BadRequest();
            _context.Entry(student).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudent(int id)
        {
            var student = await _context.Students.FindAsync(id);
            if (student == null) return NotFound();
            _context.Students.Remove(student);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // --- ENROLLMENT ENDPOINTS ---

        [HttpGet("enrollments")]
        public async Task<ActionResult<IEnumerable<Enrollment>>> GetAllEnrollments()
        {
            return await _context.Enrollments.ToListAsync();
        }

        [HttpGet("{studentId}/courses")]
        public async Task<ActionResult<IEnumerable<Enrollment>>> GetStudentEnrollments(int studentId)
        {
            return await _context.Enrollments
                .Where(e => e.StudentId == studentId)
                .ToListAsync();
        }

        [HttpPost("enroll")]
        public async Task<IActionResult> EnrollStudent([FromBody] Enrollment enrollment)
        {
            // Set date on server side for accuracy
            enrollment.EnrollmentDate = DateTime.Now;
            enrollment.EnrollmentId = 0; // Ensure DB generates ID

            _context.Enrollments.Add(enrollment);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Student enrolled successfully", data = enrollment });
        }
    }
}