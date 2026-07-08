from pathlib import Path
p = Path(r'c:\Users\ArunBAarode\Desktop\mediconeckt-frontend\Mediconeckt-Clinic\src\components\DoctorDashboard\Dashboard\DoctorDashboard.jsx')
text = p.read_text(encoding='utf-8')
old = """
              <div className="table-responsive">
                <table className="table dd-appointments-table align-middle mb-0">
                  <thead className="dd-table-header">
                    <tr>
                      <th className="dd-serial-col">S No.</th>
                      <th className="dd-patient-col">Patient</th>
                      <th className="dd-gender-col">Gender</th>
                      <th className="dd-issue-col">Issue</th>
                      <th className="dd-phone-col">Phone</th>
                      <th className="dd-bp-col">BP</th>
                      <th className="dd-blood-group-col">BG</th>
                      <th className="dd-scheduled-col">Time</th>
                      <th className="dd-status-col">Status</th>
                      <th className="dd-action-col">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {queueItems.map((a, idx) => (
                      <tr key={${a.id}-} className="dd-appointment-row">
                        <td className="dd-serial-number text-center">
                          <span className="dd-serial-badge">{idx + 1}</span>
                        </td>
                        <td className="dd-patient-name-cell">
                          <div className="d-flex align-items-center">
                            <div className="dd-patient-avatar-small bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-2" 
                                 style={{ width: '32px', height: '32px', fontSize: '0.8rem' }}>
                              {a.name
                                .split(" ")
                                .map((n) => n[0])
                                .slice(0, 2)
                                .join("")}
                            </div>
                            <span className="dd-patient-name fw-bold">{a.name}</span>
                          </div>
                        </td>
                        <td className="dd-patient-gender-cell">
                          <Badge bg={a.gender === "Male" ? "primary" : "danger"} className="dd-gender-badge">
                            {a.gender}
                          </Badge>
                        </td>
                        <td className="dd-patient-issue-cell">
                          <span className="dd-issue-text">{a.issue}</span>
                        </td>
                        <td className="dd-patient-phone-cell">
                          <a href={	el:} className="dd-phone-link text-decoration-none">
                            <i className="bi bi-telephone me-1"></i>
                            {a.phone}
                          </a>
                        </td>
                        <td className="dd-bp-cell">
                          <Badge bg="info" className="dd-bp-badge">
                            {a.bp || 'N/A'}
                          </Badge>
                        </td>
                        <td className="dd-blood-group-cell">
                          <Badge bg="danger" className="dd-blood-group-badge">
                            {a.bloodGroup || 'N/A'}
                          </Badge>
                        </td>
                        <td className="dd-scheduled-time-cell">
                          <div className="dd-time-display">
                            <i className="bi bi-clock me-1"></i>
                            {a.scheduledTime}
                          </div>
                        </td>
                        <td className="dd-status-cell">
                          <StatusBadge status={a.status} />
                        </td>
                        <td className="dd-action-cell">
                          {(!activeSession?.appt || activeSession?.appt?.id === a.id) &&
                            a.status !== "completed" && (
                              <Button
                                variant="primary"
                                size="sm"
                                onClick={() => handleConsentClick(a)}
                                className="dd-consent-btn"
                                disabled={activeSession?.status === "break"}
                              >
                                <i className="bi bi-person-check me-1"></i>
                                Consultation
                              </Button>
                            )}

                          {activeSession?.appt?.id === a.id &&
                            a.status === "in-progress" && (
                              <Badge bg="info" className="dd-active-badge">
                                <Spinner animation="border" size="sm" className="me-1" />
                                Active
                              </Badge>
                            ))}
                        </td>
                      </tr>
                    ))}

                    {queueItems.length === 0 && (
                      <tr className="dd-no-appointments-row">
                        <td colSpan="10" className="text-center py-4">
                          <div className="dd-empty-state">
                            <i className="bi bi-check-circle-fill fs-1 text-success mb-3"></i>
                            <h6 className="text-muted mb-0">No appointments in this queue</h6>
                            <p className="text-muted small mt-1">Switch tab to view other appointment states.</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
"""
new = """
              <div className="dd-queue-list">
                {queueItems.length > 0 ? (
                  queueItems.map((a, idx) => (
                    <div
                      key={${a.id}-}
                      className={dd-queue-item-card card mb-3 }
                    >
                      <div className="card-body p-3 d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
                        <div className="dd-queue-item-main flex-grow-1">
                          <div className="d-flex align-items-center gap-3 mb-2">
                            <div
                              className="dd-patient-avatar-small bg-primary text-white rounded-circle d-flex align-items-center justify-content-center"
                              style={{ width: '40px', height: '40px', fontSize: '0.95rem' }}
                            >
                              {a.name
                                .split(" ")
                                .map((n) => n[0])
                                .slice(0, 2)
                                .join("")}
                            </div>
                            <div>
                              <div className="dd-patient-name fw-bold">{a.name}</div>
                              <div className="text-muted dd-queue-item-subtitle">
                                {a.issue} • {a.scheduledTime}
                              </div>
                            </div>
                          </div>

                          <div className="d-flex flex-wrap align-items-center gap-2 dd-queue-item-metadata">
                            <Badge bg={a.gender === "Male" ? "primary" : "danger"} className="dd-gender-badge">
                              {a.gender}
                            </Badge>
                            <Badge bg="info" className="dd-bp-badge">
                              BP: {a.bp || 'N/A'}
                            </Badge>
                            <Badge bg="warning" text="dark" className="dd-blood-group-badge">
                              BG: {a.bloodGroup || 'N/A'}
                            </Badge>
                            <a href={	el:} className="dd-phone-link text-decoration-none text-muted">
                              <i className="bi bi-telephone me-1"></i>
                              {a.phone}
                            </a>
                          </div>
                        </div>

                        <div className="dd-queue-item-actions text-md-end">
                          <div className="mb-3">
                            <StatusBadge status={a.status} />
                          </div>
                          {activeSession?.appt?.id === a.id && a.status === "in-progress" ? (
                            <Badge bg="info" className="dd-active-badge">
                              <Spinner animation="border" size="sm" className="me-1" />
                              Active
                            </Badge>
                          ) : (
                            a.status !== "completed" && (
                              <Button
                                variant="primary"
                                size="sm"
                                onClick={() => handleConsentClick(a)}
                                className="dd-consent-btn"
                                disabled={activeSession?.status === "break"}
                              >
                                <i className="bi bi-person-check me-1"></i>
                                Consultation
                              </Button>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="dd-empty-state py-5 text-center">
                    <i className="bi bi-check-circle-fill fs-1 text-success mb-3"></i>
                    <h6 className="text-muted mb-0">No appointments in this queue</h6>
                    <p className="text-muted small mt-1">Switch tab to view other appointment states.</p>
                  </div>
                )}
              </div>
"""
if old not in text:
    raise SystemExit('old block not found')
p.write_text(text.replace(old,new,1),encoding='utf-8')
print('replaced')
