import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Send, RefreshCw, Heart, Repeat2, MessageCircle, CheckCircle2, ChevronDown, ChevronUp, BarChart3, Bot, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PollOption {
  text: string;
  votes: number;
}

interface Poll {
  question: string;
  options: PollOption[];
  totalVotes: number;
  hoursLeft: number;
}

interface SplashPost {
  handle: string;
  displayName: string;
  verified: boolean;
  content: string;
  likes: number;
  reposts: number;
  replies: number;
  isReply: boolean;
  replyTo: string | null;
  poll?: Poll | null;
}

interface TriviaMessage {
  role: 'user' | 'assistant';
  content: string;
}

const getAvatarColor = (handle: string) => {
  const colors = [
    "bg-red-500", "bg-blue-500", "bg-green-500", "bg-purple-500",
    "bg-orange-500", "bg-pink-500", "bg-teal-500", "bg-indigo-500"
  ];
  const index = handle.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
  return colors[index];
};

const getTimeAgo = (index: number) => {
  const times = ["Just now", "2m", "5m", "12m", "23m", "45m", "1h", "2h", "3h"];
  return times[Math.min(index, times.length - 1)];
};

const formatNumber = (num: number) => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num.toString();
};

interface PostWithReplies extends SplashPost {
  generatedReplies?: SplashPost[];
  showReplies?: boolean;
  loadingReplies?: boolean;
}

export const SplashfeedSection = () => {
  const [prompt, setPrompt] = useState("");
  const [posts, setPosts] = useState<PostWithReplies[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [votedPolls, setVotedPolls] = useState<Set<string>>(new Set());
  
  // Trivia state
  const [triviaQuestion, setTriviaQuestion] = useState("");
  const [triviaMessages, setTriviaMessages] = useState<TriviaMessage[]>([]);
  const [isAskingTrivia, setIsAskingTrivia] = useState(false);
  
  const { toast } = useToast();

  const generateThread = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Enter a topic",
        description: "What should Splashfeed users discuss?",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setPosts([]);
    setVotedPolls(new Set());

    try {
      const { data, error } = await supabase.functions.invoke('generate-splashfeed', {
        body: { prompt: prompt.trim() }
      });

      if (error) {
        throw error;
      }

      if (data?.posts && Array.isArray(data.posts)) {
        setPosts(data.posts.map((post: SplashPost) => ({ ...post, generatedReplies: [], showReplies: false })));
        toast({
          title: "Thread generated!",
          description: `${data.posts.length} posts created`,
        });
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error: any) {
      console.error('Error generating thread:', error);
      toast({
        title: "Generation failed",
        description: error.message || "Failed to generate Splashfeed thread",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const askTrivia = async () => {
    if (!triviaQuestion.trim()) {
      toast({
        title: "Enter a question",
        description: "What do you want to know about Corefall?",
        variant: "destructive",
      });
      return;
    }

    const userMessage: TriviaMessage = { role: 'user', content: triviaQuestion.trim() };
    setTriviaMessages(prev => [...prev, userMessage]);
    setTriviaQuestion("");
    setIsAskingTrivia(true);

    try {
      const { data, error } = await supabase.functions.invoke('corefall-trivia', {
        body: { question: userMessage.content }
      });

      if (error) throw error;

      if (data?.answer) {
        setTriviaMessages(prev => [...prev, { role: 'assistant', content: data.answer }]);
      } else {
        throw new Error('No answer received');
      }
    } catch (error: any) {
      console.error('Error asking trivia:', error);
      setTriviaMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "Sorry, I couldn't answer that question. Please try again!" 
      }]);
      toast({
        title: "Trivia failed",
        description: error.message || "Failed to get trivia answer",
        variant: "destructive",
      });
    } finally {
      setIsAskingTrivia(false);
    }
  };

  const handleTriviaKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isAskingTrivia) {
      askTrivia();
    }
  };

  const generateReplies = async (postIndex: number) => {
    const post = posts[postIndex];
    
    // Toggle if already loaded
    if (post.generatedReplies && post.generatedReplies.length > 0) {
      setPosts(prev => prev.map((p, i) => 
        i === postIndex ? { ...p, showReplies: !p.showReplies } : p
      ));
      return;
    }

    // Set loading state
    setPosts(prev => prev.map((p, i) => 
      i === postIndex ? { ...p, loadingReplies: true } : p
    ));

    try {
      const { data, error } = await supabase.functions.invoke('generate-splashfeed', {
        body: { 
          generateReplies: true,
          originalPost: {
            handle: post.handle,
            displayName: post.displayName,
            content: post.content
          }
        }
      });

      if (error) throw error;

      if (data?.posts && Array.isArray(data.posts)) {
        setPosts(prev => prev.map((p, i) => 
          i === postIndex 
            ? { ...p, generatedReplies: data.posts, showReplies: true, loadingReplies: false }
            : p
        ));
      }
    } catch (error: any) {
      console.error('Error generating replies:', error);
      toast({
        title: "Failed to load replies",
        description: error.message || "Could not generate replies",
        variant: "destructive",
      });
      setPosts(prev => prev.map((p, i) => 
        i === postIndex ? { ...p, loadingReplies: false } : p
      ));
    }
  };

  const handleVote = (postIndex: number, optionIndex: number) => {
    const pollKey = `${postIndex}`;
    if (votedPolls.has(pollKey)) return;

    setVotedPolls(prev => new Set([...prev, pollKey]));
    
    // Update vote count locally
    setPosts(prev => prev.map((post, pIdx) => {
      if (pIdx === postIndex && post.poll) {
        const newOptions = post.poll.options.map((opt, oIdx) => 
          oIdx === optionIndex ? { ...opt, votes: opt.votes + 1 } : opt
        );
        return {
          ...post,
          poll: {
            ...post.poll,
            options: newOptions,
            totalVotes: post.poll.totalVotes + 1
          }
        };
      }
      return post;
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isGenerating) {
      generateThread();
    }
  };

  const renderPoll = (poll: Poll, postIndex: number) => {
    const hasVoted = votedPolls.has(`${postIndex}`);
    
    return (
      <div className="mt-3 border border-border rounded-lg p-3 bg-muted/20">
        <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
          <BarChart3 className="w-4 h-4" />
          <span>{poll.hoursLeft}h left</span>
        </div>
        <div className="space-y-2">
          {poll.options.map((option, optionIndex) => {
            const percentage = poll.totalVotes > 0 
              ? Math.round((option.votes / poll.totalVotes) * 100) 
              : 0;
            
            return (
              <button
                key={optionIndex}
                onClick={() => handleVote(postIndex, optionIndex)}
                disabled={hasVoted}
                className={`w-full text-left rounded-lg border transition-all ${
                  hasVoted 
                    ? 'border-border bg-muted/30 cursor-default' 
                    : 'border-primary/30 hover:border-primary hover:bg-primary/10 cursor-pointer'
                }`}
              >
                <div className="relative p-2.5 overflow-hidden">
                  {hasVoted && (
                    <div 
                      className="absolute inset-0 bg-primary/20 transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  )}
                  <div className="relative flex items-center justify-between">
                    <span className="font-medium text-sm">{option.text}</span>
                    {hasVoted && (
                      <span className="text-sm text-muted-foreground font-medium">{percentage}%</span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {formatNumber(poll.totalVotes)} votes
        </p>
      </div>
    );
  };

  const renderPost = (post: PostWithReplies, index: number, isReplyPost = false) => (
    <article 
      key={`${isReplyPost ? 'reply-' : ''}${index}`} 
      className={`p-4 bg-card hover:bg-muted/30 transition-colors border-b border-border last:border-b-0 ${
        post.isReply || isReplyPost ? 'pl-8 bg-muted/10' : ''
      }`}
    >
      {(post.isReply || isReplyPost) && post.replyTo && (
        <p className="text-xs text-muted-foreground mb-2">
          Replying to <span className="text-primary">{post.replyTo}</span>
        </p>
      )}
      
      <div className="flex gap-3">
        {/* Avatar */}
        <div className={`w-10 h-10 rounded-full ${getAvatarColor(post.handle)} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
          {post.displayName.charAt(0).toUpperCase()}
        </div>
        
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-1 flex-wrap">
            <span className="font-bold text-foreground">{post.displayName}</span>
            {post.verified && (
              <CheckCircle2 className="w-4 h-4 text-primary fill-primary/20" />
            )}
            <span className="text-muted-foreground text-sm">{post.handle}</span>
            <span className="text-muted-foreground text-sm">· {getTimeAgo(index)}</span>
          </div>
          
          {/* Content */}
          <p className="mt-1 text-foreground whitespace-pre-wrap break-words">
            {post.content.split(/(#\w+|@\w+)/g).map((part, i) => {
              if (part.startsWith('#') || part.startsWith('@')) {
                return <span key={i} className="text-primary">{part}</span>;
              }
              return part;
            })}
          </p>

          {/* Poll */}
          {post.poll && renderPoll(post.poll, index)}
          
          {/* Engagement */}
          <div className="flex items-center gap-6 mt-3 text-muted-foreground text-sm">
            {!isReplyPost && !post.isReply && (
              <button 
                onClick={() => generateReplies(index)}
                className="flex items-center gap-1.5 hover:text-primary transition-colors group"
                disabled={post.loadingReplies}
              >
                {post.loadingReplies ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : post.showReplies ? (
                  <ChevronUp className="w-4 h-4 group-hover:scale-110 transition-transform" />
                ) : (
                  <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                )}
                <span>{post.generatedReplies?.length || post.replies}</span>
              </button>
            )}
            {(isReplyPost || post.isReply) && (
              <button className="flex items-center gap-1.5 hover:text-primary transition-colors group">
                <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>{formatNumber(post.replies)}</span>
              </button>
            )}
            <button className="flex items-center gap-1.5 hover:text-green-500 transition-colors group">
              <Repeat2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>{formatNumber(post.reposts)}</span>
            </button>
            <button className="flex items-center gap-1.5 hover:text-red-500 transition-colors group">
              <Heart className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>{formatNumber(post.likes)}</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-black text-primary mb-2 flex items-center justify-center gap-3">
          <span className="text-4xl">💦</span>
          Splashfeed
        </h1>
        <p className="text-muted-foreground">
          See what the Corefall community is saying
        </p>
      </div>

      {/* Tabs for Feed vs Trivia */}
      <Tabs defaultValue="feed" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="feed" className="gap-2">
            <MessageCircle className="w-4 h-4" />
            Feed Generator
          </TabsTrigger>
          <TabsTrigger value="trivia" className="gap-2">
            <Bot className="w-4 h-4" />
            Ask Trivia
          </TabsTrigger>
        </TabsList>

        {/* Feed Tab */}
        <TabsContent value="feed" className="space-y-6">
          {/* Input Section */}
          <Card className="p-4 bg-card border-border">
            <div className="flex gap-3">
              <Input
                placeholder="What's happening in Corefall? (e.g., 'Is Cascade Juner the GOAT?')"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isGenerating}
                className="flex-1 bg-background border-border"
              />
              <Button 
                onClick={generateThread} 
                disabled={isGenerating}
                className="gap-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Post
                  </>
                )}
              </Button>
            </div>
            
            {/* Suggestion chips */}
            <div className="flex flex-wrap gap-2 mt-3">
              {[
                "Nothing Sawryr wins Apex 709!",
                "Should Cascade Juner be the GOAT?",
                "Rain Lieryon comeback?",
                "Underrated players this season"
              ].map((suggestion) => (
                <Badge 
                  key={suggestion}
                  variant="secondary" 
                  className="cursor-pointer hover:bg-primary/20 transition-colors text-xs"
                  onClick={() => !isGenerating && setPrompt(suggestion)}
                >
                  {suggestion}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Loading State */}
          {isGenerating && (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <Loader2 className="w-8 h-8 animate-spin mb-4 text-primary" />
              <p>Generating Splashfeed thread...</p>
              <p className="text-sm">The community is typing...</p>
            </div>
          )}

          {/* Posts Feed */}
          {posts.length > 0 && (
            <div className="border border-border rounded-lg overflow-hidden">
              {posts.map((post, index) => (
                <div key={index}>
                  {renderPost(post, index)}
                  
                  {/* Generated Replies */}
                  {post.showReplies && post.generatedReplies && post.generatedReplies.length > 0 && (
                    <div className="border-l-2 border-primary/30 ml-6">
                      {post.generatedReplies.map((reply, replyIndex) => 
                        renderPost({ ...reply, generatedReplies: [], showReplies: false }, replyIndex, true)
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isGenerating && posts.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-lg mb-2">💦 No posts yet</p>
              <p className="text-sm">Enter a topic to see what Splashfeed users think!</p>
            </div>
          )}

          {/* Regenerate Button */}
          {posts.length > 0 && !isGenerating && (
            <div className="text-center">
              <Button 
                variant="outline" 
                onClick={generateThread}
                className="gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Generate New Thread
              </Button>
            </div>
          )}
        </TabsContent>

        {/* Trivia Tab */}
        <TabsContent value="trivia" className="space-y-6">
          <Card className="p-4 bg-card border-border">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">CoreBot</h3>
                <p className="text-xs text-muted-foreground">Corefall Trivia Expert</p>
              </div>
              <Badge variant="secondary" className="ml-auto gap-1">
                <Sparkles className="w-3 h-3" />
                AI Powered
              </Badge>
            </div>
            
            <div className="flex gap-3">
              <Input
                placeholder="Ask anything about Corefall... (e.g., 'Who has the most Apex titles?')"
                value={triviaQuestion}
                onChange={(e) => setTriviaQuestion(e.target.value)}
                onKeyPress={handleTriviaKeyPress}
                disabled={isAskingTrivia}
                className="flex-1 bg-background border-border"
              />
              <Button 
                onClick={askTrivia} 
                disabled={isAskingTrivia}
                className="gap-2"
              >
                {isAskingTrivia ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
            
            {/* Trivia Suggestions */}
            <div className="flex flex-wrap gap-2 mt-3">
              {[
                "Who won Apex 709?",
                "How many trophies does Cascade Juner have?",
                "Which team won CTT 709?",
                "Who is the GOAT?"
              ].map((suggestion) => (
                <Badge 
                  key={suggestion}
                  variant="secondary" 
                  className="cursor-pointer hover:bg-primary/20 transition-colors text-xs"
                  onClick={() => !isAskingTrivia && setTriviaQuestion(suggestion)}
                >
                  {suggestion}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Trivia Chat */}
          {triviaMessages.length > 0 && (
            <div className="space-y-4">
              {triviaMessages.map((msg, index) => (
                <div 
                  key={index}
                  className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div 
                    className={`max-w-[80%] p-3 rounded-lg ${
                      msg.role === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  </div>
                  {msg.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
                      <span className="text-white text-xs font-bold">You</span>
                    </div>
                  )}
                </div>
              ))}
              
              {isAskingTrivia && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-primary" />
                      <span className="text-sm text-muted-foreground">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Empty Trivia State */}
          {triviaMessages.length === 0 && !isAskingTrivia && (
            <div className="text-center py-12 text-muted-foreground">
              <Bot className="w-12 h-12 mx-auto mb-4 text-primary/50" />
              <p className="text-lg mb-2">Ask CoreBot anything!</p>
              <p className="text-sm">Player stats, tournament history, team rosters, and more.</p>
            </div>
          )}

          {/* Clear Chat Button */}
          {triviaMessages.length > 0 && (
            <div className="text-center">
              <Button 
                variant="outline" 
                onClick={() => setTriviaMessages([])}
                className="gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Clear Chat
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
