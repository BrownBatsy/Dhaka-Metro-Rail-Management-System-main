import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '@/components/layout/Layout';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  AlertCircle,
  Check,
  MessageSquare,
  Star,
  ThumbsUp
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const StarRating = ({
  rating,
  setRating
}: {
  rating: number;
  setRating: (value: number) => void;
}) => (
  <div className="flex space-x-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
        className="focus:outline-none"
        onClick={() => setRating(star)}
      >
        <Star
          className={`h-8 w-8 ${
            star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
          }`}
        />
      </button>
    ))}
  </div>
);

const FeedbackPage = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('review');
  const [rating, setRating] = useState(0);

  const [reviewForm, setReviewForm] = useState({ comment: '' });
  const [complaintForm, setComplaintForm] = useState({
    title: '',
    description: '',
    urgency: 'medium'
  });
  const [suggestionForm, setSuggestionForm] = useState({
    title: '',
    description: ''
  });

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast({
        title: t('ratingRequired'),
        description: t('ratingError'),
        variant: 'destructive'
      });
      return;
    }

    toast({
      title: t('reviewSuccessTitle'),
      description: t('reviewSuccessDesc', { rating })
    });

    setRating(0);
    setReviewForm({ comment: '' });
  };

  const handleComplaintSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: t('complaintSubmitted'),
      description: t('complaintSuccess')
    });

    setComplaintForm({ title: '', description: '', urgency: 'medium' });
  };

  const handleSuggestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: t('suggestionSuccessTitle'),
      description: t('suggestionSuccessDesc')
    });

    setSuggestionForm({ title: '', description: '' });
  };

  return (
    <Layout isLoggedIn={true}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t('feedbackTitle')}</h1>
          <p className="mt-2 text-gray-600">{t('feedbackIntro')}</p>
        </div>

        <Tabs defaultValue="review" onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full md:w-auto grid-cols-3">
            <TabsTrigger value="review" className={activeTab === 'review' ? 'metro-tab-active' : 'metro-tab'}>
              <ThumbsUp className="h-4 w-4 mr-2" />
              {t('leaveReview')}
            </TabsTrigger>
            <TabsTrigger value="complaint" className={activeTab === 'complaint' ? 'metro-tab-active' : 'metro-tab'}>
              <AlertCircle className="h-4 w-4 mr-2" />
              {t('fileComplaint')}
            </TabsTrigger>
            <TabsTrigger value="suggestion" className={activeTab === 'suggestion' ? 'metro-tab-active' : 'metro-tab'}>
              <MessageSquare className="h-4 w-4 mr-2" />
              {t('makeSuggestion')}
            </TabsTrigger>
          </TabsList>

          {/* Review Tab */}
          <TabsContent value="review">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>{t('shareExperience')}</CardTitle>
                  <CardDescription>{t('shareExperienceDesc')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleReviewSubmit} className="space-y-6">
                    <div className="space-y-3">
                      <Label>{t('yourRating')}</Label>
                      <StarRating rating={rating} setRating={setRating} />
                    </div>
                    <div className="space-y-3">
                      <Label>{t('commentsOptional')}</Label>
                      <Textarea
                        placeholder="..."
                        className="min-h-[120px]"
                        value={reviewForm.comment}
                        onChange={(e) => setReviewForm({ comment: e.target.value })}
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button type="submit" className="bg-metro-green">
                        {t('submitReview')}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              <Card className="h-fit">
                <CardHeader>
                  <CardTitle>{t('whyReviewMatters')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-gray-600">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-start">
                      <div className="mt-1 mr-4 rounded-full bg-green-100 p-1">
                        <Check className="h-4 w-4 text-metro-green" />
                      </div>
                      <p>{t(`reviewPoint${i}`)}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Complaint Tab */}
          <TabsContent value="complaint">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>{t('fileComplaintTitle')}</CardTitle>
                  <CardDescription>{t('fileComplaintDesc')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleComplaintSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label>{t('subject')}</Label>
                        <Input
                          placeholder="..."
                          value={complaintForm.title}
                          onChange={(e) => setComplaintForm({ ...complaintForm, title: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-3">
                        <Label>{t('urgencyLevel')}</Label>
                        <Select
                          value={complaintForm.urgency}
                          onValueChange={(value) => setComplaintForm({ ...complaintForm, urgency: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">{t('lowUrgency')}</SelectItem>
                            <SelectItem value="medium">{t('mediumUrgency')}</SelectItem>
                            <SelectItem value="high">{t('highUrgency')}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label>{t('description')}</Label>
                      <Textarea
                        placeholder="..."
                        className="min-h-[150px]"
                        value={complaintForm.description}
                        onChange={(e) =>
                          setComplaintForm({ ...complaintForm, description: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button type="submit" className="bg-metro-green">
                        {t('submitComplaint')}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              <Card className="h-fit">
                <CardHeader>
                  <CardTitle>{t('complaintInfo')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-gray-600">
                  <p>{t('complaintInfo1')}</p>
                  <p>{t('complaintInfo2')}</p>
                  <p>{t('complaintInfo3')}</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Suggestion Tab */}
          <TabsContent value="suggestion">
            <Card>
              <CardHeader>
                <CardTitle>{t('makeSuggestionTitle')}</CardTitle>
                <CardDescription>{t('makeSuggestionDesc')}</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSuggestionSubmit} className="space-y-6">
                  <div className="space-y-3">
                    <Label>{t('suggestionTitle')}</Label>
                    <Input
                      placeholder="..."
                      value={suggestionForm.title}
                      onChange={(e) => setSuggestionForm({ ...suggestionForm, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-3">
                    <Label>{t('description')}</Label>
                    <Textarea
                      placeholder="..."
                      className="min-h-[150px]"
                      value={suggestionForm.description}
                      onChange={(e) =>
                        setSuggestionForm({ ...suggestionForm, description: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit" className="bg-metro-green">
                      {t('submitSuggestion')}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default FeedbackPage;
