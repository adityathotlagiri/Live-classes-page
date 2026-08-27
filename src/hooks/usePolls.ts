import { useState, useCallback, useEffect } from 'react';
import type { Poll, PollOption, PollSubmission } from '@/types/engagement';
import { mockPolls, mockPollSubmissions } from '@/data/mockEngagementData';

export function usePolls(currentUserId: string) {
  const [polls, setPolls] = useState<Poll[]>(mockPolls);
  const [submissions, setSubmissions] = useState<PollSubmission[]>(mockPollSubmissions);
  const [isLoading, setIsLoading] = useState(true);

  const activePoll = polls.find((p) => p.status === 'active');
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);
  const mySubmissionFor = useCallback(
    (pollId: string) => submissions.find((s) => s.pollId === pollId && s.studentId === currentUserId),
    [submissions, currentUserId]
  );

  const createPoll = useCallback((question: string, optionTexts: string[]) => {
    const newPoll: Poll = {
      id: `poll-${Date.now()}`,
      question,
      options: optionTexts.map((text, i) => ({
        id: `opt-${Date.now()}-${i}`,
        text,
        voteCount: 0,
      })),
      status: 'draft',
      createdAt: new Date().toISOString(),
      showResultsToStudents: false,
    };
    setPolls((prev) => [...prev, newPoll]);
    return newPoll.id;
  }, []);

  const startPoll = useCallback((pollId: string) => {
    setPolls((prev) => prev.map((p) => (p.id === pollId ? { ...p, status: 'active' } : p)));
  }, []);

  const closePoll = useCallback((pollId: string) => {
    setPolls((prev) =>
      prev.map((p) => (p.id === pollId ? { ...p, status: 'closed', closedAt: new Date().toISOString() } : p))
    );
  }, []);

  const toggleShowResults = useCallback((pollId: string) => {
    setPolls((prev) =>
      prev.map((p) =>
        p.id === pollId ? { ...p, showResultsToStudents: !p.showResultsToStudents } : p
      )
    );
  }, []);

  const submitAnswer = useCallback(
    (pollId: string, optionId: string) => {
      // Guard against double-submission — a student can only answer once
      const alreadySubmitted = submissions.some(
        (s) => s.pollId === pollId && s.studentId === currentUserId
      );
      if (alreadySubmitted) return;

      const newSubmission: PollSubmission = {
        pollId,
        studentId: currentUserId,
        optionId,
        submittedAt: new Date().toISOString(),
      };
      setSubmissions((prev) => [...prev, newSubmission]);

      setPolls((prev) =>
        prev.map((p) => {
          if (p.id !== pollId) return p;
          const updatedOptions: PollOption[] = p.options.map((opt) =>
            opt.id === optionId ? { ...opt, voteCount: opt.voteCount + 1 } : opt
          );
          return { ...p, options: updatedOptions };
        })
      );
    },
    [submissions, currentUserId]
  );

  const totalVotesFor = useCallback(
    (poll: Poll) => poll.options.reduce((sum, opt) => sum + opt.voteCount, 0),
    []
  );

  return {
    polls,
    activePoll,
    submissions,
    isLoading,
    mySubmissionFor,
    createPoll,
    startPoll,
    closePoll,
    toggleShowResults,
    submitAnswer,
    totalVotesFor,
  };
}