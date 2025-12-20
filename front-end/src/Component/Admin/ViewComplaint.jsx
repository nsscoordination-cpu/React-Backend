import React, { useEffect, useState } from "react";
import api from "../../api";

const ViewComplaint = () => {
  const [filter, setFilter] = useState("all");
  const [activeReply, setActiveReply] = useState(null);
  const [replyText, setReplyText] = useState("");

  const [complaints, setComplaints] = useState([]);
  const [studentsMap, setStudentsMap] = useState({});

  /* ================= FETCH DATA ================= */
  const getAllComplaints = async () => {
    try {
      const res = await api.get("/admin/allcomplaints");
        console.log(res);
        
      setComplaints(res.data.allcomplaints);

      const map = {};
      res.data.students.forEach((s) => {
        map[s.commonKey] = s;
      });

      setStudentsMap(map);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAllComplaints();
  }, []);

  /* ================= FILTER ================= */
  const filteredComplaints = complaints.filter((c) => {
    if (filter === "pending") return !c.replay;
    if (filter === "replied") return c.replay;
    return true;
  });

  /* ================= COUNTS ================= */
  const totalCount = complaints.length;
  const pendingCount = complaints.filter((c) => !c.replay).length;
  const repliedCount = complaints.filter((c) => c.replay).length;

  /* ================= HANDLERS ================= */
  const handleReply = (id) => {
    setActiveReply(id);
    setReplyText("");
  };

  const sendReply = async () => {
    if (!replyText.trim()) {
      alert("Reply cannot be empty");
      return;
    }

    try {
      const res = await api.put(
        `/admin/sendreplay/${activeReply}`,
        { replay: replyText }
      );

      alert("Replied successfully");

      setActiveReply(null);
      setReplyText("");

      // ✅ re-call get function
      getAllComplaints();
    } catch (e) {
      console.log(e);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="container">
      <h2>📩 Student Complaints</h2>

      {/* ================= FILTER BUTTONS ================= */}
      <div className="filters">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          All ({totalCount})
        </button>

        <button
          className={filter === "pending" ? "active" : ""}
          onClick={() => setFilter("pending")}
        >
          Pending ({pendingCount})
        </button>

        <button
          className={filter === "replied" ? "active" : ""}
          onClick={() => setFilter("replied")}
        >
          Replied ({repliedCount})
        </button>
      </div>

      {/* ================= EMPTY ================= */}
      {filteredComplaints.length === 0 && (
        <p className="empty">No complaints found</p>
      )}

      {/* ================= COMPLAINT LIST ================= */}
      {filteredComplaints.map((c) => {
        const student = studentsMap[c.studentId];

        return (
          <div key={c._id} className="card">
            <div className="header">
              <div>
                <strong>{student?.name || "Unknown Student"}</strong>
                <p className="sub">
                  Class: {student?.className || "-"} | Email:{" "}
                  {student?.email || "-"}
                </p>
              </div>
              <span className="date">
                {new Date(c.createdAt).toLocaleDateString()}
              </span>
            </div>

            <p className="message">{c.complaint}</p>

            <div className="actions">
              {!c.replay ? (
                <span className="badge pending">Not replied yet</span>
              ) : (
                <span className="badge replied">✔ Replied</span>
              )}
            </div>

            {/* ================= REPLY VIEW ================= */}
            {c.replay && (
              <div className="reply">
                <strong>Reply:</strong> {c.replay}
              </div>
            )}

            {/* ================= REPLY BUTTON ================= */}
            {!c.replay && (
              <button onClick={() => handleReply(c._id)}>Reply</button>
            )}

            {/* ================= REPLY BOX ================= */}
            {activeReply === c._id && (
              <div className="reply-box">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={`Reply to ${student?.name}`}
                />
                <div className="reply-actions">
                  <button className="send" onClick={sendReply}>
                    Send Reply
                  </button>
                  <button
                    className="cancel"
                    onClick={() => setActiveReply(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ViewComplaint;
